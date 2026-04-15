// Individual Block Component
import HeaderBlock from './BlockTypes/HeaderBlock';
import TextBlock from './BlockTypes/TextBlock';
import ImageBlock from './BlockTypes/ImageBlock';
import MarkdownBlock from './BlockTypes/MarkdownBlock';
import '../styles/Block.css';

export default function Block({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  index,
  total
}) {
  const getBlockTitle = () => {
    const titles = {
      header: 'Header',
      text: 'Text Block',
      image: 'Image',
      markdown: 'Markdown'
    };
    return titles[block.type] || 'Block';
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'header':
        return <HeaderBlock data={block.data} onUpdate={onUpdate} isEditing={isSelected} />;
      case 'text':
        return <TextBlock data={block.data} onUpdate={onUpdate} isEditing={isSelected} />;
      case 'image':
        return <ImageBlock data={block.data} onUpdate={onUpdate} isEditing={isSelected} />;
      case 'markdown':
        return <MarkdownBlock data={block.data} onUpdate={onUpdate} isEditing={isSelected} />;
      default:
        return <div>Unknown block type</div>;
    }
  };

  return (
    <div className={`block ${isSelected ? 'selected' : ''}`}>
      <div className="block-header" onClick={onSelect}>
        <div className="block-info">
          <span className="block-type-badge">{getBlockTitle()}</span>
          <span className="block-index">#{index + 1}</span>
        </div>
        <div className="block-actions">
          <button
            className="block-action-btn delete"
            title="Delete block"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this block?')) {
                onDelete();
              }
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {renderBlockContent()}

      {!isSelected && (
        <div className="block-hint">
          Click to edit or drag to reorder
        </div>
      )}
    </div>
  );
}
