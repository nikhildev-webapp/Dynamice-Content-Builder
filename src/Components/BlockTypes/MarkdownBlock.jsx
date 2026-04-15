// Markdown Block Component
import { marked } from 'marked';

export default function MarkdownBlock({ data, onUpdate, isEditing }) {
  const parseMarkdown = (markdown) => {
    try {
      return marked(markdown || '');
    } catch (error) {
      console.error('Markdown parsing error:', error);
      return '<p>Invalid markdown</p>';
    }
  };

  if (isEditing) {
    return (
      <div className="block-content markdown-block editing">
        <div className="edit-group">
          <label>Markdown Content:</label>
          <textarea
            value={data.markdown || ''}
            onChange={(e) => onUpdate({ ...data, markdown: e.target.value })}
            placeholder="Enter markdown syntax here..."
            rows="6"
          />
        </div>
        <div className="markdown-preview">
          <p style={{ fontSize: '0.8em', color: '#666' }}>Preview:</p>
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(data.markdown) }} />
        </div>
      </div>
    );
  }

  return (
    <div className="block-content markdown-block">
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(data.markdown) }} />
    </div>
  );
}
