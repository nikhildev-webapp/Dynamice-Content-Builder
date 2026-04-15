// Canvas - Main editing area with drag and drop
import Block from './Block';
import '../styles/Canvas.css';

export default function Canvas({
  blocks,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  onReorderBlocks,
  selectedBlockId,
  onSelectBlock,
  draggedBlockId,
  onSetDraggedBlock
}) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type) {
        // New block from palette
        onAddBlock(data.type);
      } else if (data.blockId && data.sourceIndex !== undefined) {
        // Reordering existing block
        const targetIndex = blocks.length; // Drop at the end
        if (data.sourceIndex !== targetIndex) {
          const newBlocks = [...blocks];
          const [moved] = newBlocks.splice(data.sourceIndex, 1);
          newBlocks.splice(targetIndex, 0, moved);
          onReorderBlocks(newBlocks);
        }
      }
    } catch (error) {
      console.error('Drop error:', error);
    }
  };

  const handleBlockDragStart = (e, blockId, index) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ blockId, sourceIndex: index })
    );
    onSetDraggedBlock(blockId);
  };

  const handleBlockDragEnd = () => {
    onSetDraggedBlock(null);
  };

  const handleBlockDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleBlockDrop = (e, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.sourceIndex !== undefined && data.blockId && data.sourceIndex !== targetIndex) {
        const newBlocks = [...blocks];
        const [moved] = newBlocks.splice(data.sourceIndex, 1);
        newBlocks.splice(targetIndex, 0, moved);
        onReorderBlocks(newBlocks);
      }
    } catch (error) {
      console.error('Block drop error:', error);
    }
    onSetDraggedBlock(null);
  };

  return (
    <div className="canvas">
      <div className="canvas-header">
        <h2>Canvas</h2>
        <p>{blocks.length} block{blocks.length !== 1 ? 's' : ''}</p>
      </div>

      <div
        className="canvas-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {blocks.length === 0 ? (
          <div className="canvas-empty">
            <p>📭 Drag components from the palette or use the quick add button</p>
          </div>
        ) : (
          <div className="blocks-container">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                draggable
                onDragStart={(e) => handleBlockDragStart(e, block.id, index)}
                onDragEnd={handleBlockDragEnd}
                onDragOver={handleBlockDragOver}
                onDrop={(e) => handleBlockDrop(e, index)}
                className={`block-wrapper ${draggedBlockId === block.id ? 'dragging' : ''}`}
              >
                <Block
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => onSelectBlock(block.id)}
                  onUpdate={(updatedData) => onUpdateBlock(block.id, updatedData)}
                  onDelete={() => onDeleteBlock(block.id)}
                  index={index}
                  total={blocks.length}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
