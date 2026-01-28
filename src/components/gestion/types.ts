export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "En stock" | "Bajo stock" | "Agotado";
  description?: string;
  sku?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  lastPurchase: string;
  status: "Activo" | "Inactivo";
}

export interface Order {
  id: string;
  clientName: string;
  clientId: number;
  products: { productId: number; productName: string; quantity: number; price: number }[];
  total: number;
  status: "Completado" | "En proceso" | "Pendiente" | "Cancelado";
  date: string;
}

export interface SalesData {
  month: string;
  ventas: number;
}

export type TabId = "dashboard" | "inventario" | "ventas" | "clientes" | "reportes";
