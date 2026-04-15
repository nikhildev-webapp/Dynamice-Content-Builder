// Image Block Component
export default function ImageBlock({ data, onUpdate, isEditing }) {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (isEditing) {
    return (
      <div className="block-content image-block editing">
        <div className="edit-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={data.imageUrl || ''}
            onChange={(e) => onUpdate({ ...data, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="edit-group">
          <label>Alt Text:</label>
          <input
            type="text"
            value={data.altText || ''}
            onChange={(e) => onUpdate({ ...data, altText: e.target.value })}
            placeholder="Describe the image"
          />
        </div>
        <div className="edit-group">
          <label>Image Width (%):</label>
          <input
            type="number"
            min="10"
            max="100"
            value={data.width || 100}
            onChange={(e) => onUpdate({ ...data, width: Math.max(10, parseInt(e.target.value) || 100) })}
          />
        </div>
      </div>
    );
  }

  const imageUrl = data.imageUrl || '';
  const isValid = isValidUrl(imageUrl);

  return (
    <div className="block-content image-block">
      {isValid ? (
        <img
          src={imageUrl}
          alt={data.altText || 'Content image'}
          style={{ maxWidth: `${data.width || 100}%` }}
          onError={(e) => {
            e.target.parentElement.innerHTML = '<div className="image-placeholder"><p>🖼️ Image failed to load</p></div>';
          }}
        />
      ) : (
        <div className="image-placeholder">
          <p>🖼️ No valid image URL</p>
        </div>
      )}
    </div>
  );
}
