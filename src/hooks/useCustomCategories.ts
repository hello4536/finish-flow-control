
import { useState, useEffect } from 'react';

export function useCustomCategories() {
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  // Load custom categories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('customInventoryCategories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomCategories(parsed);
        }
      } catch (error) {
        console.error('Failed to parse custom categories:', error);
      }
    }
  }, []);

  // Save to localStorage whenever custom categories change
  useEffect(() => {
    localStorage.setItem('customInventoryCategories', JSON.stringify(customCategories));
  }, [customCategories]);

  const addCustomCategory = (category: string) => {
    if (category.trim() && !customCategories.includes(category.trim())) {
      setCustomCategories(prev => [...prev, category.trim()]);
      return true;
    }
    return false;
  };

  const removeCustomCategory = (category: string) => {
    setCustomCategories(prev => prev.filter(cat => cat !== category));
  };

  return {
    customCategories,
    addCustomCategory,
    removeCustomCategory
  };
}
