import { useState, useEffect, useRef } from 'react';
import Palette from './Components/Palette';
import Canvas from './Components/Canvas';
import BlockEditor from './Components/BlockEditor';
import { storageManager } from './utils/storageManager';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [draggedBlockId, setDraggedBlockId] = useState(null);
  const [showPalette, setShowPalette] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const fileInputRef = useRef(null);

  // Generate a unique ID using timestamp and random
  const generateId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Load blocks from local storage on mount
  useEffect(() => {
    const savedBlocks = storageManager.loadBlocks();
    if (savedBlocks.length > 0) {
      setBlocks(savedBlocks);
    }
  }, []);

  // Save blocks to local storage whenever they change
  useEffect(() => {
    storageManager.saveBlocks(blocks);
  }, [blocks]);

  // Detect mobile/tablet screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close mobile menus on resize to desktop
      if (window.innerWidth >= 768) {
        setShowPalette(false);
        setShowEditor(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add a new block
  const handleAddBlock = (type) => {
    const newBlock = {
      id: generateId(),
      type,
      data: getDefaultData(type)
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Get default data for block type
  const getDefaultData = (type) => {
    const defaults = {
      header: { text: 'Untitled Heading', level: 1 },
      text: { text: 'Enter your text here...' },
      image: { imageUrl: '', altText: '', width: 100 },
      markdown: { markdown: '# Welcome to Markdown\n\nStart typing markdown syntax...' }
    };
    return defaults[type] || {};
  };

  // Update block data
  const handleUpdateBlock = (blockId, newData) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, data: newData } : block
      )
    );
  };

  // Delete a block
  const handleDeleteBlock = (blockId) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  // Reorder blocks
  const handleReorderBlocks = (newBlocks) => {
    setBlocks(newBlocks);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedBlockId(null);
  };

  // Clear all blocks
  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all blocks? This cannot be undone.')) {
      setBlocks([]);
      setSelectedBlockId(null);
      storageManager.clearBlocks();
    }
  };

  // Export as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(blocks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content-page.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Validate block structure for import
  const isValidBlock = (block) => {
    return (
      block &&
      typeof block === 'object' &&
      typeof block.id === 'string' &&
      ['header', 'text', 'image', 'markdown'].includes(block.type) &&
      block.data &&
      typeof block.data === 'object'
    );
  };

  // Import from JSON
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result);
        if (Array.isArray(imported) && imported.length > 0) {
          // Validate all blocks
          const allValid = imported.every(isValidBlock);
          if (allValid) {
            setBlocks(imported);
            setSelectedBlockId(null);
            alert('✅ Blocks imported successfully!');
          } else {
            alert('❌ Invalid block structure detected. Please ensure all blocks have required fields: id, type, data.');
          }
        } else if (Array.isArray(imported) && imported.length === 0) {
          alert('⚠️ Import file is empty. No blocks were imported.');
        } else {
          alert('❌ Invalid file format. Please import a JSON file with an array of blocks.');
        }
        // Reset file input
        e.target.value = '';
      } catch (error) {
        alert('❌ Error importing blocks: ' + error.message);
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📝 Dynamic Content Builder</h1>
          <p>Drag and drop to create your personalized content page</p>
        </div>
        <div className="header-actions">
          {isMobile ? (
            <>
              <button
                className="action-btn mobile-menu-btn"
                onClick={() => setShowPalette(!showPalette)}
                title="Toggle palette"
              >
                🎨 Palette
              </button>
              <button
                className="action-btn mobile-menu-btn"
                onClick={() => setShowEditor(!showEditor)}
                title="Toggle editor"
              >
                ⚙️ Edit
              </button>
            </>
          ) : (
            <>
              <button className="action-btn export-btn" onClick={handleExport} title="Export as JSON">
                ⬇️ Export
              </button>
              <button
                className="action-btn import-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Import from JSON"
              >
                ⬆️ Import
              </button>
              <button
                className="action-btn clear-btn"
                onClick={handleClearAll}
                disabled={blocks.length === 0}
                title="Clear all blocks"
              >
                🗑️ Clear All
              </button>
            </>
          )}
        </div>
      </header>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />

      <div className="app-container">
        <aside className={`sidebar palette-sidebar ${isMobile ? (showPalette ? 'mobile-open' : 'mobile-closed') : ''}`}>
          <Palette onAddBlock={(type) => {
            handleAddBlock(type);
            if (isMobile) setShowPalette(false);
          }} />
          {isMobile && showPalette && (
            <div className="mobile-menu-overlay" onClick={() => setShowPalette(false)} />
          )}
        </aside>

        <main className="main-content">
          <Canvas
            blocks={blocks}
            onAddBlock={handleAddBlock}
            onUpdateBlock={handleUpdateBlock}
            onDeleteBlock={handleDeleteBlock}
            onReorderBlocks={handleReorderBlocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            draggedBlockId={draggedBlockId}
            onSetDraggedBlock={setDraggedBlockId}
          />
        </main>

        <aside className={`sidebar editor-sidebar ${isMobile ? (showEditor ? 'mobile-open' : 'mobile-closed') : ''}`}>
          {selectedBlockId ? (
            <BlockEditor
              selectedBlock={selectedBlockId}
              blocks={blocks}
              onClearSelection={() => {
                handleClearSelection();
                if (isMobile) setShowEditor(false);
              }}
            />
          ) : (
            <div className="editor-placeholder">
              <p>👆 Select a block to edit</p>
            </div>
          )}
          {isMobile && showEditor && (
            <div className="mobile-menu-overlay" onClick={() => setShowEditor(false)} />
          )}
        </aside>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p>💾 Your changes are automatically saved to your browser</p>
          {isMobile && (
            <div className="mobile-footer-actions">
              <button className="action-btn export-btn" onClick={handleExport} title="Export as JSON">
                ⬇️ Export
              </button>
              <label className="action-btn import-btn" title="Import from JSON">
                ⬆️ Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className="action-btn clear-btn"
                onClick={handleClearAll}
                disabled={blocks.length === 0}
                title="Clear all blocks"
              >
                🗑️ Clear All
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
