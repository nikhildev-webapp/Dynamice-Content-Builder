// Markdown Block Component
import { marked } from 'marked';

// Simple recursive sanitizer for common XSS vectors
const sanitizeHtml = (html) => {
  if (typeof html !== 'string') return '';
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove dangerous protocols (javascript:, data:, vbscript:)
  sanitized = sanitized.replace(/href\s*=\s*["']?\s*(?:javascript|data|vbscript):[^"'>]*/gi, 'href="#"');
  
  return sanitized;
};

export default function MarkdownBlock({ data, onUpdate, isEditing }) {
  const parseMarkdown = (markdown) => {
    try {
      const parsed = marked(markdown || '');
      const sanitized = sanitizeHtml(parsed);
      return sanitized;
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
