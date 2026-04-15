# 🐛 Bug Report & Analysis

## Summary
Scanned entire codebase (8 React files, 6 CSS files, 1 utility file). Found **7 bugs** ranging from low to high severity.

---

## 🔴 HIGH SEVERITY BUGS

### Bug #1: Mobile Drag-Drop Not Working
**File**: Canvas.jsx, Block.jsx  
**Lines**: Various  
**Issue**: HTML5 Drag-and-Drop API doesn't work well on touch devices. Users on mobile cannot drag items from palette.  
**Impact**: Core feature broken on mobile (but quick-add button works)  
**Status**: ⚠️ By design (HTML5 limitation) - may need polyfill

**Current Workaround**: Quick-add Text button provides fallback

**Suggested Fix**: Add touch event listeners or note as limitation in docs

---

## 🟠 MEDIUM SEVERITY BUGS

### Bug #2: Duplicate File Input Elements (Import)
**File**: src/App.jsx  
**Lines**: 173 (desktop) and 263 (mobile)  
**Issue**: File input appears twice in DOM - once in header and once in footer on mobile  
**Symptom**: File selection state may not reset properly between imports  
**Risk**: Import might fail or import wrong file on repeated attempts  

**Code**:
```javascript
// Line 173 - Desktop header
<label className="action-btn import-btn">
  ⬆️ Import
  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
</label>

// Line 263 - Mobile footer (DUPLICATE)
<label className="action-btn import-btn">
  ⬆️ Import
  <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
</label>
```

**Fix**: Use single file input or add unique key prop

---

### Bug #3: XSS Vulnerability in MarkdownBlock
**File**: src/Components/BlockTypes/MarkdownBlock.jsx  
**Lines**: 16, 33  
**Issue**: Uses `dangerouslySetInnerHTML` without input sanitization  
**Risk**: User-supplied markdown could contain script injection if parser is bypassed  
**Marked version**: 18.0.0 (should be safe, but no explicit sanitization)

**Code**:
```javascript
<div className="preview-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(data.markdown) }} />
```

**Current mitigation**: `marked` library handles most XSS, but best practice requires explicit sanitizer

**Fix**: Add DOMPurify or sanitize marked output

---

### Bug #4: No Block Import Validation
**File**: src/App.jsx  
**Lines**: 130-137  
**Issue**: Import only checks if data is an array, doesn't validate block structure  
**Risk**: Corrupted import file could crash the app or produce invalid state

**Code**:
```javascript
if (Array.isArray(imported)) {
  setBlocks(imported);  // ← No validation of block structure!
  alert('Blocks imported successfully!');
}
```

**Required block structure**:
```javascript
{ id: string, type: 'header'|'text'|'image'|'markdown', data: object }
```

**Fix**: Add schema validation or block sanitizer

---

## 🟡 LOW SEVERITY BUGS

### Bug #5: Move Block Buttons Disabled & Non-Functional
**File**: src/Components/Block.jsx  
**Lines**: 45-63  
**Issue**: Move-up and move-down buttons appear in UI but are disabled and have empty click handlers  
**Impact**: User confusion - buttons look clickable but don't work  
**Reason**: Functionality was planned but not implemented (comment: "This will be handled by Canvas component")

**Code**:
```javascript
{index > 0 && (
  <button
    className="block-action-btn move-up"
    title="Move up"
    onClick={(e) => {
      e.stopPropagation();
      // This will be handled by Canvas component ← EMPTY!
    }}
    disabled  // ← Why disabled if not implemented?
  >
    ↑
  </button>
)}
```

**Fix**: Either remove buttons or implement reorder functionality

---

### Bug #6: Palette onAddBlock Parameter Mismatch
**File**: src/App.jsx (line 197) + src/Components/Palette.jsx (line 55)  
**Issue**: Inconsistent function signature leads to confusion  
**Severity**: Low (works by accident)

**Problem**:
```javascript
// App.jsx passes a function with NO parameters
<Palette onAddBlock={() => {
  handleAddBlock('text');  // ← Hard-coded to 'text'
  if (isMobile) setShowPalette(false);
}} />

// But Palette calls it WITH a parameter
onClick={() => onAddBlock('text')}  // ← Passing argument
```

The function in App.jsx is `() => {...}` (0 params) but called with 1 param. TypeScript/ESLint would catch this.

**Fix**: Change App.jsx to accept `type` parameter:
```javascript
<Palette onAddBlock={(type) => {
  handleAddBlock(type);
  if (isMobile) setShowPalette(false);
}} />
```

Or change Palette to call without argument:
```javascript
onClick={() => onAddBlock()}
```

---

### Bug #7: ImageBlock URL Validation Incomplete
**File**: src/Components/BlockTypes/ImageBlock.jsx  
**Lines**: 40-48  
**Issue**: No error handler for failed image loads; URL might be valid but image unreachable  
**Impact**: Broken images don't have fallback UI  
**Current**: Shows placeholder only if URL is invalid (not if image 404s)

**Code**:
```javascript
<img
  src={imageUrl}
  alt={data.altText || 'Content image'}
  style={{ maxWidth: `${data.width || 100}%` }}
/>  // ← No onerror handler
```

**Fix**: Add onerror handler:
```javascript
<img
  src={imageUrl}
  alt={data.altText || 'Content image'}
  style={{ maxWidth: `${data.width || 100}%` }}
  onError={(e) => {
    e.target.style.display = 'none';
    // Show fallback
  }}
/>
```

---

## 📋 Bug Summary Table

| # | File | Issue | Severity | Type | Fixable |
|---|------|-------|----------|------|---------|
| 1 | Canvas/Block | Touch drag-drop broken | 🔴 HIGH | Feature Limit | ⚠️ Needs polyfill |
| 2 | App.jsx | Duplicate file input | 🟠 MEDIUM | State Bug | ✅ Easy |
| 3 | MarkdownBlock | XSS vulnerability | 🟠 MEDIUM | Security | ✅ Easy |
| 4 | App.jsx | No import validation | 🟠 MEDIUM | Data Bug | ✅ Medium |
| 5 | Block.jsx | Disabled move buttons | 🟡 LOW | UX Bug | ✅ Easy |
| 6 | App.jsx/Palette | Param mismatch | 🟡 LOW | Code Quality | ✅ Easy |
| 7 | ImageBlock | No error handling | 🟡 LOW | UX Bug | ✅ Easy |

---

## 🔧 Recommended Fix Priority

1. **Bug #2** (Duplicate input) - Easy, fixes potential import issues
2. **Bug #3** (XSS) - Medium difficulty, important for security
3. **Bug #4** (Import validation) - Medium difficulty, prevents corrupt state
4. **Bug #6** (Param mismatch) - Very easy, improves code clarity
5. **Bug #5** (Move buttons) - Easy, removes confusion
6. **Bug #7** (Image error) - Easy, improves UX
7. **Bug #1** (Touch drag) - Hard, may need external library

---

## ✅ Status: READY FOR FIXES

All bugs are actionable and fixable. Proceeding with implementation...
