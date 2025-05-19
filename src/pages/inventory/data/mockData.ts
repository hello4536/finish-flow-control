
// Mock data for inventory items
export const mockInventoryItems = [
  { name: "Finished Cabinet A", sku: "CAB-001", category: "Furniture", in_stock: 24, allocated: 8, available: 16, location: "Warehouse A" },
  { name: "Office Desk B", sku: "DESK-002", category: "Furniture", in_stock: 15, allocated: 5, available: 10, location: "Warehouse B" },
  { name: "Kitchen Counter C", sku: "COUNT-003", category: "Kitchen", in_stock: 8, allocated: 2, available: 6, location: "Warehouse A" },
  { name: "Bookshelf D", sku: "SHELF-004", category: "Furniture", in_stock: 12, allocated: 0, available: 12, location: "Warehouse C" },
  { name: "TV Stand E", sku: "STAND-005", category: "Entertainment", in_stock: 6, allocated: 3, available: 3, location: "Warehouse B" },
  { name: "Coffee Table F", sku: "TABLE-006", category: "Furniture", in_stock: 20, allocated: 5, available: 15, location: "Warehouse A" },
  { name: "Dining Set G", sku: "DINING-007", category: "Kitchen", in_stock: 4, allocated: 1, available: 3, location: "Warehouse C" },
  { name: "Sofa H", sku: "SOFA-008", category: "Furniture", in_stock: 7, allocated: 2, available: 5, location: "Warehouse B" },
  { name: "Chair I", sku: "CHAIR-009", category: "Furniture", in_stock: 30, allocated: 10, available: 20, location: "Warehouse A" },
  { name: "Bed Frame J", sku: "BED-010", category: "Bedroom", in_stock: 5, allocated: 0, available: 5, location: "Warehouse C" },
];

// Mock data for warehouses
export const mockWarehouses = [
  { id: 1, name: "Warehouse A", location: "123 Main St, City A", capacity: 1000, utilized: 650 },
  { id: 2, name: "Warehouse B", location: "456 Oak Ave, City B", capacity: 800, utilized: 520 },
  { id: 3, name: "Warehouse C", location: "789 Pine Rd, City C", capacity: 1200, utilized: 900 },
];
