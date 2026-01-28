import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SistemaGestion from "./pages/SistemaGestion";
import Ecommerce from "./pages/Ecommerce";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import TransformacionDigital from "./pages/TransformacionDigital";
import GestionDocumental from "./pages/GestionDocumental";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sistema-gestion" element={<SistemaGestion />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/dashboard-analytics" element={<DashboardAnalytics />} />
          <Route path="/transformacion-digital" element={<TransformacionDigital />} />
          <Route path="/gestion-documental" element={<GestionDocumental />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
