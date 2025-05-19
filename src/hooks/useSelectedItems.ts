
import { useState } from 'react';
import { InventoryItem } from '@/types/inventory';

export function useSelectedItems(items: InventoryItem[]) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const clearSelections = () => {
    setSelectedItems([]);
  };

  return {
    selectedItems,
    handleSelectItem,
    handleSelectAll,
    clearSelections
  };
}
