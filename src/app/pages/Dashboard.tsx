import { TrendingUp, DollarSign, ShoppingCart, Package } from "lucide-react";
import { KPICard } from "../components/ui/KPICard";

const dashboardKPIs = [
  {
    title: "Total Revenue",
    value: "$742,890",
    trend: { value: "+12.5%", isPositive: true },
    icon: DollarSign,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    title: "Sales Orders",
    value: "1,284",
    trend: { value: "+8.2%", isPositive: true },
    icon: ShoppingCart,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Purchase Orders",
    value: "856",
    trend: { value: "+10.2%", isPositive: true },
    icon: ShoppingBag,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    title: "Inventory Value",
    value: "$524,890",
    trend: { value: "+5.7%", isPositive: true },
    icon: Package,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
];

function ShoppingBag(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

export function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome to Hearing Aid Labs ERP System</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {dashboardKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">New sale created - SAL-2026-001234</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Purchase order received - PUR-2026-000567</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">New customer registered - Emma Wilson</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <ShoppingCart className="text-blue-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">New Sale</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <ShoppingBag className="text-purple-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">New Purchase</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Package className="text-orange-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">Add Product</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <TrendingUp className="text-green-600 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-900">View Reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
