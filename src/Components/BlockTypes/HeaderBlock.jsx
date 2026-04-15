// Header Block Component
export default function HeaderBlock({ data, onUpdate, isEditing }) {
  const levels = [1, 2, 3, 4, 5, 6];

  if (isEditing) {
    return (
      <div className="block-content header-block editing">
        <div className="edit-group">
          <label>Header Level:</label>
          <select
            value={data.level || 1}
            onChange={(e) => onUpdate({ ...data, level: parseInt(e.target.value) })}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                H{level}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-group">
          <label>Header Text:</label>
          <input
            type="text"
            value={data.text || ''}
            onChange={(e) => onUpdate({ ...data, text: e.target.value })}
            placeholder="Enter header text"
          />
        </div>
      </div>
    );
  }

  const HeaderTag = `h${data.level || 1}`;
  return (
    <div className="block-content header-block">
      {HeaderTag === 'h1' && <h1>{data.text || 'Header'}</h1>}
      {HeaderTag === 'h2' && <h2>{data.text || 'Header'}</h2>}
      {HeaderTag === 'h3' && <h3>{data.text || 'Header'}</h3>}
      {HeaderTag === 'h4' && <h4>{data.text || 'Header'}</h4>}
      {HeaderTag === 'h5' && <h5>{data.text || 'Header'}</h5>}
      {HeaderTag === 'h6' && <h6>{data.text || 'Header'}</h6>}
    </div>
  );
}
