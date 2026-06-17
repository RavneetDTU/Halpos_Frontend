import { Loader2 } from "lucide-react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AddExpense } from "./pages/AddExpense";
import { AddPurchase } from "./pages/AddPurchase";
import { AddPurchaseByCSV } from "./pages/AddPurchaseByCSV";
import { AddSale } from "./pages/AddSale";
import { AddSaleByCSV } from "./pages/AddSaleByCSV";
import { CashupListing } from "./pages/CashupListing";
import { ListExpenses } from "./pages/ListExpenses";
import { ListPurchases } from "./pages/ListPurchases";
import { ListRefund } from "./pages/ListRefund";
import { ListReturnPurchases } from "./pages/ListReturnPurchases";
import { ListReturnSales } from "./pages/ListReturnSales";
import { LoginPage } from "./pages/LoginPage";
import { PurchaseOverview } from "./pages/PurchaseOverview";
import { SalesManagement } from "./pages/SalesManagement";
import { UpcomingFeature } from "./pages/UpcomingFeature";
import { InvoicePage } from "./pages/invoice/InvoicePage";
import { AddProduct } from "./pages/products/AddProduct";
import { ListProducts } from "./pages/products/ListProducts";
import { WarehouseSettings } from "./pages/settings/WarehouseSettings";
import { UserManagement } from "./pages/settings/UserManagement";
import { ListQuotations } from "./pages/ListQuotations";
import { ListProformas } from "./pages/ListProformas";
import { UserManagementSystem } from "./pages/settings/UserManagementSystem";

// ─── Protected layout wrapper ─────────────────────────────────────────────────
function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a full-screen spinner while restoring the session from localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center">
        <Loader2 size={32} className="text-blue-400 animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Admin-only guard ─────────────────────────────────────────────────────────
function AdminOnly() {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}

// ─── Public-only guard (redirect to app if already logged in) ─────────────────
function PublicOnly() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a1d29] flex items-center justify-center">
        <Loader2 size={32} className="text-blue-400 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public routes (redirect to / if already logged in) */}
          <Route element={<PublicOnly />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected routes (redirect to /login if not authenticated) */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<UpcomingFeature />} />

            {/* Products */}
            <Route path="/products" element={<ListProducts />} />
            {/* Admin-only product actions */}
            <Route element={<AdminOnly />}>
              <Route path="/products/add" element={<AddProduct />} />
            </Route>

            {/* Stocktake */}
            <Route path="/stocktake" element={<UpcomingFeature />} />
            <Route path="/stocktake/add" element={<UpcomingFeature />} />

            {/* Sales Routes */}
            <Route path="/sales" element={<SalesManagement />} />
            <Route path="/sales/refund" element={<ListRefund />} />
            <Route path="/sales/stock" element={<UpcomingFeature />} />
            <Route path="/sales/deliveries" element={<UpcomingFeature />} />
            <Route path="/sales/gift-cards" element={<UpcomingFeature />} />
            <Route path="/sales/return" element={<ListReturnSales />} />
            <Route path="/sales/cashup" element={<CashupListing />} />
            {/* Admin-only sale creation */}
            <Route element={<AdminOnly />}>
              <Route path="/sales/add" element={<AddSale />} />
              <Route path="/sales/add-csv" element={<AddSaleByCSV />} />
            </Route>

            {/* Invoice */}
            <Route path="/invoice/:id" element={<InvoicePage />} />

            {/* Quotations */}
            <Route path="/quotations" element={<ListQuotations />} />
            <Route path="/quotations/add" element={<AddSale />} />

            {/* Proformas */}
            <Route path="/proforma" element={<ListProformas />} />
            <Route path="/proforma/add" element={<AddSale />} />

            {/* Trials */}
            <Route path="/trials" element={<UpcomingFeature />} />
            <Route path="/trials/add" element={<UpcomingFeature />} />

            {/* Purchase Routes */}
            <Route path="/purchases" element={<ListPurchases />} />
            <Route path="/purchases/overview" element={<PurchaseOverview />} />
            <Route path="/purchases/add" element={<AddPurchase />} />
            <Route path="/purchases/add-csv" element={<AddPurchaseByCSV />} />
            <Route path="/purchases/return" element={<ListReturnPurchases />} />
            <Route path="/purchases/expenses" element={<ListExpenses />} />
            <Route path="/purchases/add-expense" element={<AddExpense />} />

            {/* Transfers */}
            <Route path="/transfers" element={<UpcomingFeature />} />
            <Route path="/transfers/add" element={<UpcomingFeature />} />

            {/* People */}
            <Route path="/people/customers" element={<UpcomingFeature />} />
            <Route path="/people/suppliers" element={<UpcomingFeature />} />
            <Route path="/people/users" element={<UpcomingFeature />} />

            {/* Notifications */}
            <Route path="/notifications" element={<UpcomingFeature />} />

            {/* Acclimatisation */}
            <Route path="/acclimatisation" element={<UpcomingFeature />} />

            {/* Settings */}
            <Route path="/settings/general" element={<UpcomingFeature />} />
            <Route path="/settings/warehouse" element={<WarehouseSettings />} />
            {/* Admin-only settings */}
            <Route element={<AdminOnly />}>
              <Route path="/settings/users" element={<UserManagement />} />
            </Route>

            {/* Reports */}
            <Route path="/reports/sales" element={<UpcomingFeature />} />
            <Route path="/reports/purchases" element={<UpcomingFeature />} />
            <Route path="/reports/inventory" element={<UpcomingFeature />} />

            {/* Medical Aids */}
            <Route path="/medical-aids" element={<UpcomingFeature />} />
            <Route path="/medical-aids/add" element={<UpcomingFeature />} />

            {/* Requests */}
            <Route path="/requests" element={<UpcomingFeature />} />
            <Route path="/requests/add" element={<UpcomingFeature />} />

            {/* Logs */}
            <Route path="/logs/activity" element={<UpcomingFeature />} />
            <Route path="/logs/system" element={<UpcomingFeature />} />

            {/* Trashed */}
            <Route path="/trashed" element={<UpcomingFeature />} />

            {/* SMS */}
            <Route path="/sms/send" element={<UpcomingFeature />} />
            <Route path="/sms/history" element={<UpcomingFeature />} />

            {/* Access Requests */}
            <Route path="/access-requests" element={<UpcomingFeature />} />

            {/* Mail */}
            <Route path="/mail/inbox" element={<UpcomingFeature />} />
            <Route path="/mail/sent" element={<UpcomingFeature />} />

            {/* Serial Nos */}
            <Route path="/serial-nos" element={<UpcomingFeature />} />

            {/* Cash */}
            <Route path="/cash/flow" element={<UpcomingFeature />} />
            <Route path="/cash/reports" element={<UpcomingFeature />} />

            {/* Calls */}
            <Route path="/calls/log" element={<UpcomingFeature />} />
            <Route path="/calls/schedule" element={<UpcomingFeature />} />

            {/* Broadcast */}
            <Route path="/broadcast/send" element={<UpcomingFeature />} />
            <Route path="/broadcast/history" element={<UpcomingFeature />} />

            {/* Targets */}
            <Route path="/targets/sales" element={<UpcomingFeature />} />
            <Route path="/targets/set" element={<UpcomingFeature />} />

            {/* User Management System */}
            <Route path="/user-management-system" element={<UserManagementSystem />} />

            {/* Manual */}
            <Route path="/manual" element={<UpcomingFeature />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}