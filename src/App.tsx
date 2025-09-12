import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drivers from "./pages/Drivers";
import Riders from "./pages/Riders";
import UserDetails from "./pages/UserDetails";
import RideOptions from "./pages/RideOptions";
import { BookingReport } from "./pages/BookingReport";
import { TransactionReport } from "./pages/TransactionReport";
import RevenueReport from "./pages/RevenueReport";
import PanicManagement from "./pages/PanicReportEnhanced";
import NotificationManagement from "./pages/NotificationManagement";
import DiscountManagement from "./pages/DiscountManagement";
import WalletBalances from "./pages/WalletBalances";
import UserDevices from "./pages/UserDevices";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // console.log('🚨 APP DEBUG: App component rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="hcab-admin-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/drivers" element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            } />
            <Route path="/riders" element={
              <ProtectedRoute>
                <Riders />
              </ProtectedRoute>
            } />
            <Route path="/user/:userId" element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            } />
            <Route path="/ride-options" element={
              <ProtectedRoute>
                <RideOptions />
              </ProtectedRoute>
            } />
            <Route path="/booking-report" element={
              <ProtectedRoute>
                <BookingReport />
              </ProtectedRoute>
            } />
                    <Route path="/transaction-report" element={
          <ProtectedRoute>
            <TransactionReport />
          </ProtectedRoute>
        } />
        <Route path="/revenue-report" element={
          <ProtectedRoute>
            <RevenueReport />
          </ProtectedRoute>
        } />
        <Route path="/panic-management" element={
          <ProtectedRoute>
            <PanicManagement />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationManagement />
          </ProtectedRoute>
        } />
        <Route path="/discounts" element={
          <ProtectedRoute>
            <DiscountManagement />
          </ProtectedRoute>
        } />
        <Route path="/wallet-balances" element={
          <ProtectedRoute>
            <WalletBalances />
          </ProtectedRoute>
        } />
        <Route path="/user-devices" element={
          <ProtectedRoute>
            <UserDevices />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
</ThemeProvider>
</QueryClientProvider>
  );
};

export default App;
