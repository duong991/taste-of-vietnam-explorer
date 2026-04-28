import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CityPage from "./pages/CityPage.tsx";
import CityListPage from "./pages/CityListPage.tsx";
import DishListPage from "./pages/DishListPage.tsx";
import DishDetailPage from "./pages/DishDetailPage.tsx";
import TourListPage from "./pages/TourListPage.tsx";
import TourDetailPage from "./pages/TourDetailPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Vietnamese routes */}
          <Route path="/thanh-pho" element={<CityListPage />} />
          <Route path="/thanh-pho/:slug" element={<CityPage />} />
          <Route path="/mon-an" element={<DishListPage />} />
          <Route path="/mon-an/:slug" element={<DishDetailPage />} />
          <Route path="/tour" element={<TourListPage />} />
          <Route path="/tour/:slug" element={<TourDetailPage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          {/* English bilingual aliases */}
          <Route path="/cities" element={<CityListPage />} />
          <Route path="/cities/:slug" element={<CityPage />} />
          <Route path="/dishes" element={<DishListPage />} />
          <Route path="/dishes/:slug" element={<DishDetailPage />} />
          <Route path="/tours" element={<TourListPage />} />
          <Route path="/tours/:slug" element={<TourDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
