// Storage Manager - Handle local storage operations
const STORAGE_KEY = 'dynamice_content_builder';

export const storageManager = {
  // Save blocks to local storage
  saveBlocks: (blocks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
      return true;
    } catch (error) {
      console.error('Failed to save blocks:', error);
      return false;
    }
  },

  // Load blocks from local storage
  loadBlocks: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load blocks:', error);
      return [];
    }
  },

  // Clear all blocks
  clearBlocks: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear blocks:', error);
      return false;
    }
  }
};
