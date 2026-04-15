// Palette - Component selector panel
import '../styles/Palette.css';

export default function Palette({ onAddBlock }) {
  const blockTypes = [
    {
      id: 'header',
      label: 'Header',
      icon: '📝',
      description: 'Add a customizable heading'
    },
    {
      id: 'text',
      label: 'Text Block',
      icon: '✍️',
      description: 'Add rich text content'
    },
    {
      id: 'image',
      label: 'Image',
      icon: '🖼️',
      description: 'Add an image from URL'
    },
    {
      id: 'markdown',
      label: 'Markdown',
      icon: '📋',
      description: 'Add markdown formatted text'
    }
  ];

  return (
    <div className="palette">
      <div className="palette-header">
        <h2>Component Palette</h2>
        <p>Drag blocks to canvas</p>
      </div>
      <div className="block-types">
        {blockTypes.map((type) => (
          <div
            key={type.id}
            className="block-type-item"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.effectAllowed = 'copy';
              e.dataTransfer.setData('application/json', JSON.stringify({ type: type.id }));
            }}
            title={type.description}
          >
            <div className="block-type-icon">{type.icon}</div>
            <div className="block-type-label">{type.label}</div>
          </div>
        ))}
      </div>
      <button className="quick-add-btn" onClick={() => onAddBlock('text')}>
        + Quick Add Text
      </button>
      <div style={{ fontSize: '0.8em', color: 'rgba(255,255,255,0.7)', marginTop: '12px', textAlign: 'center' }}>
        <p>💡 Tip: Drag blocks to canvas to add custom types</p>
      </div>
    </div>
  );
}
