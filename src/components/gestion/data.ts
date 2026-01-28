import { Product, Client, Order, SalesData } from "./types";

export const initialProducts: Product[] = [
  { id: 1, name: "Laptop Dell XPS 15", category: "Electrónicos", stock: 45, price: 1299.99, status: "En stock", sku: "DELL-XPS-15", description: "Laptop premium con pantalla 4K" },
  { id: 2, name: "Monitor LG 27\"", category: "Electrónicos", stock: 23, price: 349.99, status: "En stock", sku: "LG-MON-27", description: "Monitor IPS de alta resolución" },
  { id: 3, name: "Teclado Mecánico", category: "Accesorios", stock: 8, price: 89.99, status: "Bajo stock", sku: "TEC-MEC-01", description: "Teclado mecánico RGB" },
  { id: 4, name: "Mouse Inalámbrico", category: "Accesorios", stock: 0, price: 45.99, status: "Agotado", sku: "MOU-WIFI-01", description: "Mouse ergonómico inalámbrico" },
  { id: 5, name: "Silla Ergonómica", category: "Mobiliario", stock: 15, price: 299.99, status: "En stock", sku: "SIL-ERG-01", description: "Silla de oficina ergonómica" },
  { id: 6, name: "Escritorio Ajustable", category: "Mobiliario", stock: 12, price: 499.99, status: "En stock", sku: "ESC-AJU-01", description: "Escritorio con altura ajustable" },
];

export const initialClients: Client[] = [
  { id: 1, name: "María García", email: "maria@email.com", phone: "+57 300 123 4567", totalPurchases: 5, lastPurchase: "2024-01-15", status: "Activo" },
  { id: 2, name: "Carlos López", email: "carlos@email.com", phone: "+57 301 234 5678", totalPurchases: 3, lastPurchase: "2024-01-10", status: "Activo" },
  { id: 3, name: "Ana Martínez", email: "ana@email.com", phone: "+57 302 345 6789", totalPurchases: 8, lastPurchase: "2024-01-18", status: "Activo" },
  { id: 4, name: "Juan Rodríguez", email: "juan@email.com", phone: "+57 303 456 7890", totalPurchases: 2, lastPurchase: "2024-01-05", status: "Inactivo" },
  { id: 5, name: "Laura Sánchez", email: "laura@email.com", phone: "+57 304 567 8901", totalPurchases: 12, lastPurchase: "2024-01-20", status: "Activo" },
];

export const initialOrders: Order[] = [
  { id: "#ORD-001", clientName: "María García", clientId: 1, products: [{ productId: 1, productName: "Laptop Dell XPS 15", quantity: 1, price: 1299.99 }, { productId: 2, productName: "Monitor LG 27\"", quantity: 1, price: 349.99 }], total: 1649.98, status: "Completado", date: "2024-01-15" },
  { id: "#ORD-002", clientName: "Carlos López", clientId: 2, products: [{ productId: 2, productName: "Monitor LG 27\"", quantity: 1, price: 349.99 }], total: 349.99, status: "En proceso", date: "2024-01-18" },
  { id: "#ORD-003", clientName: "Ana Martínez", clientId: 3, products: [{ productId: 5, productName: "Silla Ergonómica", quantity: 2, price: 299.99 }], total: 599.98, status: "Pendiente", date: "2024-01-19" },
  { id: "#ORD-004", clientName: "Juan Rodríguez", clientId: 4, products: [{ productId: 1, productName: "Laptop Dell XPS 15", quantity: 1, price: 1299.99 }, { productId: 6, productName: "Escritorio Ajustable", quantity: 1, price: 499.99 }], total: 1799.98, status: "Completado", date: "2024-01-20" },
];

export const initialSalesData: SalesData[] = [
  { month: "Ene", ventas: 12500 },
  { month: "Feb", ventas: 15800 },
  { month: "Mar", ventas: 14200 },
  { month: "Abr", ventas: 18500 },
  { month: "May", ventas: 21000 },
  { month: "Jun", ventas: 19800 },
];

export const categories = ["Electrónicos", "Accesorios", "Mobiliario", "Software", "Servicios"];
