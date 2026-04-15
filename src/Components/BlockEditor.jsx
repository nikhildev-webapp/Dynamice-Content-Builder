// Block Editor - Configuration panel for selected block
import '../styles/BlockEditor.css';

export default function BlockEditor({ selectedBlock, blocks, onClearSelection }) {
  if (!selectedBlock) {
    return null;
  }

  const block = blocks.find((b) => b.id === selectedBlock);
  if (!block) {
    return null;
  }

  const getBlockInfo = () => {
    const typeLabels = {
      header: 'Heading',
      text: 'Text Content',
      image: 'Image Display',
      markdown: 'Markdown'
    };
    return typeLabels[block.type] || 'Block';
  };

  return (
    <div className="block-editor">
      <div className="editor-header">
        <h3>Edit Block</h3>
        <button
          className="close-btn"
          onClick={onClearSelection}
          title="Close editor"
        >
          ✕
        </button>
      </div>

      <div className="editor-info">
        <div className="info-row">
          <strong>Type:</strong>
          <span className="info-value">{getBlockInfo()}</span>
        </div>
        <div className="info-row">
          <strong>ID:</strong>
          <span className="info-value small">{block.id}</span>
        </div>
      </div>

      <div className="editor-content">
        <p style={{ color: '#666', fontSize: '0.9em' }}>
          Click on a block in the canvas to edit its properties. Changes are automatically saved.
        </p>
      </div>
    </div>
  );
}
