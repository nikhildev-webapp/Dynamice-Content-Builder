# 📝 Dynamic Content Builder

A powerful, intuitive React.js web application that allows users to dynamically build and customize personal content pages using draggable and configurable components.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-F7DF1E?logo=javascript)

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Component Palette**: Choose from 4 predefined content block types
  - 📝 **Header**: Customizable heading with 6 levels (H1-H6)
  - ✍️ **Text Block**: Rich text content editor
  - 🖼️ **Image**: Display images from URLs with customizable sizing
  - 📋 **Markdown**: Full markdown preview with live parsing

- **Drag-and-Drop Interface**: 
  - Drag blocks from the palette to the canvas
  - Reorder blocks on the canvas with smooth drag-and-drop
  - Visual feedback with hover effects and drag states

- **Block Configuration**:
  - Click any block to edit its properties in the editor panel
  - Real-time updates as you modify content
  - Visual indication of selected/editing mode

- **Local Storage Persistence**:
  - Automatic saving of your page composition
  - Load your previous work on browser restart
  - No backend required - everything stored locally

- **Import/Export**:
  - Export your page composition as JSON
  - Import previously exported compositions
  - Share page structures with others

### 🎨 User Experience
- **Three-Panel Layout**:
  - Left Panel: Component palette for selecting blocks
  - Center Panel: Main canvas for editing
  - Right Panel: Block configuration and properties

- **Visual Design**:
  - Modern gradient UI with smooth animations
  - Responsive design for different screen sizes
  - Clear visual hierarchy and intuitive controls
  - Accessibility-focused with proper focus management

- **Smart State Management**:
  - Robust block lifecycle management
  - Efficient re-rendering with React hooks
  - Seamless auto-save without performance impact

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
```bash
cd Dynamice-Content-Builder
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

## 📋 How to Use

### Creating Content

1. **Add a Block**:
   - Drag a component type from the left panel to the center canvas, OR
   - Click the "+ Quick Add Text" button for quick text addition

2. **Edit Block Content**:
   - Click on any block header to select it
   - Edit properties in the right panel
   - Changes are saved automatically

3. **Reorder Blocks**:
   - Drag block headers up or down to reorder
   - Blocks will automatically save in the new order

4. **Delete a Block**:
   - Click the ✕ button on the block header
   - Confirm the deletion

### Block Types

#### Header Block
- **Properties**: Text content, heading level (H1-H6)
- **Use Case**: Page titles, section headers
- **Preview**: Rendered as actual HTML headings

#### Text Block
- **Properties**: Plain text content
- **Use Case**: Paragraphs, descriptions, any text content
- **Preview**: Shows plain text with line breaks preserved

#### Image Block
- **Properties**: Image URL, alt text, width percentage
- **Use Case**: Displaying images, visual content
- **Features**: URL validation, responsive sizing
- **Fallback**: Shows placeholder if URL is invalid

#### Markdown Block
- **Properties**: Markdown formatted text
- **Use Case**: Complex formatted content, lists, code blocks
- **Preview**: Live markdown parsing and rendering
- **Supported**: Headers, bold, italic, lists, code blocks, links

### Saving and Sharing

**Auto-Save**: Your composition is automatically saved to browser local storage.

**Manual Export**:
- Click the "⬇️ Export" button to download your page as JSON

**Import**:
- Click the "⬆️ Import" button to load a previously exported composition

**Clear All**:
- Click the "🗑️ Clear All" button to start fresh (cannot be undone)

## 🛠️ Project Structure

```
src/
├── components/
│   ├── Palette.jsx           # Component selection panel
│   ├── Canvas.jsx            # Main editing area with drag-drop
│   ├── Block.jsx             # Individual block wrapper
│   ├── BlockEditor.jsx       # Configuration panel
│   └── BlockTypes/           # Block component implementations
│       ├── HeaderBlock.jsx
│       ├── TextBlock.jsx
│       ├── ImageBlock.jsx
│       └── MarkdownBlock.jsx
├── utils/
│   └── storageManager.js     # Local storage operations
├── styles/
│   ├── Palette.css
│   ├── Canvas.css
│   ├── Block.css
│   ├── BlockEditor.css
│   └── App.css               # Global styles
├── App.jsx                   # Main application component
├── index.css                 # Global CSS reset
└── main.jsx                  # Entry point
```

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint for code quality
npm run lint
```

## 🎯 Technical Highlights

### State Management
- **React Hooks**: useState for block management, selection, dragging state
- **useEffect**: Auto-save to localStorage on block changes
- **Context-Free**: All state managed in App.jsx for simplicity

### Drag and Drop
- **Native HTML5 API**: No heavy dependencies
- **Smart Event Handling**: Differentiates between palette drag and canvas reordering
- **Visual Feedback**: Opacity and scale transitions during drag

### Component Architecture
- **Modular Design**: Each block type is self-contained
- **Reusable Patterns**: Consistent interface across all blocks
- **Clean Props**: Clear data flow from parent to child

### Performance Optimization
- **Controlled Rendering**: Minimal re-renders with proper dependency arrays
- **Efficient State Updates**: Immutable state patterns
- **CSS Transitions**: Hardware-accelerated animations

### Persistence Strategy
- **Auto-Save**: Saves after every block change
- **Error Handling**: Try-catch blocks for storage operations
- **Recovery**: Gracefully handles corrupted data

## 🎨 Customization

### Adding a New Block Type

1. **Create the component** in `src/Components/BlockTypes/NewBlock.jsx`:
```jsx
export default function NewBlock({ data, onUpdate, isEditing }) {
  // Component implementation
}
```

2. **Add to Palette** in `src/Components/Palette.jsx`:
```jsx
{
  id: 'newblock',
  label: 'New Block',
  icon: '🎨',
  description: 'Add a new block type'
}
```

3. **Add to Canvas** in `src/Components/Canvas.jsx` render switch

4. **Add default data** in `App.jsx` getDefaultData function

### Styling Theme

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --success: #10b981;
  --danger: #dc3545;
  /* ... more variables */
}
```

## 🔒 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE 11: ❌ Not supported

## 📦 Dependencies

- **react** (^18.3.1): UI library
- **react-dom** (^18.3.1): DOM operations
- **marked** (^11+): Markdown parsing
- **vite** (^5.4.1): Build tool

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📖 Code Examples

### Adding a Block Programmatically
```javascript
const newBlock = {
  id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  type: 'text',
  data: { text: 'Hello, World!' }
};
setBlocks([...blocks, newBlock]);
```

### Updating Block Data
```javascript
setBlocks(
  blocks.map((block) =>
    block.id === blockId ? { ...block, data: newData } : block
  )
);
```

### Exporting Data
```javascript
const dataStr = JSON.stringify(blocks, null, 2);
// Save to file or send to server
```

## 🐛 Troubleshooting

### Blocks not saving?
- Check browser console for localStorage errors
- Ensure not in private browsing mode
- Verify browser allows localStorage

### Drag and drop not working?
- Ensure JavaScript is enabled
- Check browser console for errors
- Try refreshing the page

### Images not loading?
- Verify the URL is correct and publicly accessible
- Check browser console for CORS errors
- Ensure image URL uses HTTPS

## 📝 Future Enhancements

- 📱 Mobile app version
- 🔐 User authentication and cloud sync
- 👥 Collaborative editing
- 🎨 More block types (video, embed, gallery, forms)
- 📊 Analytics and usage tracking
- 🌙 Dark mode support
- 🔍 Full-text search
- 📄 PDF export
- 🎯 Page templates
- ⌨️ Keyboard shortcuts

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React + Vite**
