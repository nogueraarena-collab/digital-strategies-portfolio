import { X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "./types";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailModal = ({ isOpen, onClose, order }: OrderDetailModalProps) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Detalle del Pedido</h3>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Header */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="text-2xl font-bold text-primary">{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.date}</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${
              order.status === "Completado" ? "bg-green-500/20 text-green-500" :
              order.status === "En proceso" ? "bg-blue-500/20 text-blue-500" :
              order.status === "Cancelado" ? "bg-red-500/20 text-red-500" :
              "bg-yellow-500/20 text-yellow-500"
            }`}>
              {order.status}
            </span>
          </div>

          {/* Client Info */}
          <div>
            <h4 className="font-semibold mb-2">Cliente</h4>
            <p className="text-muted-foreground">{order.clientName}</p>
          </div>

          {/* Products List */}
          <div>
            <h4 className="font-semibold mb-3">Productos</h4>
            <div className="space-y-2">
              {order.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium">{product.productName}</p>
                    <p className="text-sm text-muted-foreground">Cantidad: {product.quantity}</p>
                  </div>
                  <p className="font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint} className="flex-1 gap-2">
              <Printer size={18} />
              Imprimir
            </Button>
            <Button onClick={onClose} className="flex-1">
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
