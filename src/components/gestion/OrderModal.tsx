import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, Client, Order } from "./types";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Omit<Order, "id" | "date">) => void;
  products: Product[];
  clients: Client[];
}

const OrderModal = ({ isOpen, onClose, onSave, products, clients }: OrderModalProps) => {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [orderItems, setOrderItems] = useState<{ productId: number; quantity: number }[]>([]);
  const [status, setStatus] = useState<Order["status"]>("Pendiente");

  const addProduct = () => {
    setOrderItems([...orderItems, { productId: 0, quantity: 1 }]);
  };

  const removeProduct = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, productId: number) => {
    const updated = [...orderItems];
    updated[index].productId = productId;
    setOrderItems(updated);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updated = [...orderItems];
    updated[index].quantity = Math.max(1, quantity);
    setOrderItems(updated);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id.toString() === selectedClient);
    if (!client || orderItems.length === 0) return;

    const orderProducts = orderItems
      .filter(item => item.productId > 0)
      .map(item => {
        const product = products.find(p => p.id === item.productId)!;
        return {
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      });

    onSave({
      clientName: client.name,
      clientId: client.id,
      products: orderProducts,
      total: calculateTotal(),
      status,
    });

    setSelectedClient("");
    setOrderItems([]);
    setStatus("Pendiente");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Nueva Venta</h3>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Cliente</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Productos</Label>
              <Button type="button" variant="outline" size="sm" onClick={addProduct}>
                <Plus size={16} className="mr-1" /> Agregar
              </Button>
            </div>

            <div className="space-y-3">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                  <Select 
                    value={item.productId.toString()} 
                    onValueChange={(v) => updateProduct(index, parseInt(v))}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.filter(p => p.stock > 0).map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} - ${product.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeProduct(index)}
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </Button>
                </div>
              ))}

              {orderItems.length === 0 && (
                <p className="text-center text-muted-foreground py-4 bg-secondary/30 rounded-lg">
                  Agrega productos a la venta
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Estado</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as Order["status"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En proceso">En proceso</SelectItem>
                <SelectItem value="Completado">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <span className="font-medium">Total:</span>
            <span className="text-2xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!selectedClient || orderItems.length === 0}
            >
              Crear Venta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
