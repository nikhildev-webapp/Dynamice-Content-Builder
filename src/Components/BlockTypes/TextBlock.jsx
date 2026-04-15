// Text Block Component
export default function TextBlock({ data, onUpdate, isEditing }) {
  if (isEditing) {
    return (
      <div className="block-content text-block editing">
        <div className="edit-group">
          <label>Text Content:</label>
          <textarea
            value={data.text || ''}
            onChange={(e) => onUpdate({ ...data, text: e.target.value })}
            placeholder="Enter your text here..."
            rows="6"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="block-content text-block">
      <p>{data.text || 'No text content'}</p>
    </div>
  );
}
