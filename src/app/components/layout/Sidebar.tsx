import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShoppingCart,
  ListOrdered,
  PlusCircle,
  RotateCcw,
  Archive,
  FileText,
  ShoppingBag,
  DollarSign,
  Users,
  Bell,
  Settings,
  TrendingUp,
  Heart,
  Star,
  Info,
  BarChart3,
  Stethoscope,
  FileQuestion,
  ScrollText,
  Trash2,
  MessageSquare,
  Mail,
  Hash,
  Wallet,
  Phone,
  Radio,
  Target,
  BookOpen,
  ChevronDown,
  Building2,
} from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  action?: () => void;
  adminOnly?: boolean;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
  {
    label: "Products",
    icon: <Package size={20} />,
    children: [
      { label: "List Products", icon: <ListOrdered size={18} />, path: "/products" },
      { label: "Add Product", icon: <PlusCircle size={18} />, path: "/products/add", adminOnly: true },
    ],
  },
  {
    label: "Stocktake List",
    icon: <ClipboardList size={20} />,
    children: [
      { label: "List Stocktake", icon: <ListOrdered size={18} />, path: "/stocktake" },
      { label: "Add Stocktake", icon: <PlusCircle size={18} />, path: "/stocktake/add" },
    ],
  },
  {
    label: "Sales",
    icon: <Heart size={20} />,
    children: [
      { label: "List Sales", icon: <ListOrdered size={18} />, path: "/sales" },
      { label: "List Refund", icon: <RotateCcw size={18} />, path: "/sales/refund" },
      { label: "Sales Stock", icon: <Archive size={18} />, path: "/sales/stock" },
      { label: "Add Sale", icon: <PlusCircle size={18} />, path: "/sales/add", adminOnly: true },
      { label: "Add Sale by CSV", icon: <FileText size={18} />, path: "/sales/add-csv", adminOnly: true },
      { label: "Deliveries", icon: <Package size={18} />, path: "/sales/deliveries" },
      { label: "List Gift Cards", icon: <FileText size={18} />, path: "/sales/gift-cards" },
      { label: "List Return Sales", icon: <RotateCcw size={18} />, path: "/sales/return" },
      { label: "Cashup Listing", icon: <DollarSign size={18} />, path: "/sales/cashup" },
    ],
  },
  {
    label: "Quotations",
    icon: <Heart size={20} />,
    children: [
      { label: "List Quotations", icon: <ListOrdered size={18} />, path: "/quotations" },
      { label: "Add Quotation", icon: <PlusCircle size={18} />, path: "/quotations/add" },
    ],
  },
  {
    label: "Proformas",
    icon: <ClipboardList size={20} />,
    children: [
      { label: "List Proformas", icon: <ListOrdered size={18} />, path: "/proforma" },
      { label: "Add Proforma", icon: <PlusCircle size={18} />, path: "/proforma/add" },
    ],
  },
  {
    label: "Trials",
    icon: <Heart size={20} />,
    children: [
      { label: "List Trials", icon: <ListOrdered size={18} />, path: "/trials" },
      { label: "Add Trial", icon: <PlusCircle size={18} />, path: "/trials/add" },
    ],
  },
  {
    label: "Purchases",
    icon: <Star size={20} />,
    children: [
      { label: "List Purchases", icon: <ListOrdered size={18} />, path: "/purchases" },
      { label: "Overview", icon: <TrendingUp size={18} />, path: "/purchases/overview" },
      { label: "Add Purchase", icon: <PlusCircle size={18} />, path: "/purchases/add" },
      { label: "Add Purchase by CSV", icon: <FileText size={18} />, path: "/purchases/add-csv" },
      { label: "List Return Purchases", icon: <RotateCcw size={18} />, path: "/purchases/return" },
      { label: "List Expenses", icon: <ListOrdered size={18} />, path: "/purchases/expenses" },
      { label: "Add Expense", icon: <PlusCircle size={18} />, action: () => window.dispatchEvent(new Event("open-add-expense")) },
    ],
  },
  {
    label: "Transfers",
    icon: <Star size={20} />,
    children: [
      { label: "List Transfers", icon: <ListOrdered size={18} />, path: "/transfers" },
      { label: "Add Transfer", icon: <PlusCircle size={18} />, path: "/transfers/add" },
    ],
  },
  {
    label: "People",
    icon: <Users size={20} />,
    children: [
      { label: "Customers", icon: <Users size={18} />, path: "/people/customers" },
      { label: "Suppliers", icon: <Users size={18} />, path: "/people/suppliers" },
      { label: "Users", icon: <Users size={18} />, path: "/people/users" },
    ],
  },
  { label: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
  { label: "Acclimatisation", icon: <Info size={20} />, path: "/acclimatisation" },
  {
    label: "Settings",
    icon: <Settings size={20} />,
    children: [
      { label: "General Settings", icon: <Settings size={18} />, path: "/settings/general" },
      { label: "User Settings", icon: <Users size={18} />, path: "/settings/users" },
      { label: "Warehouses", icon: <Building2 size={18} />, path: "/settings/warehouse" },
    ],
  },
  {
    label: "Reports",
    icon: <BarChart3 size={20} />,
    children: [
      { label: "Sales Reports", icon: <BarChart3 size={18} />, path: "/reports/sales" },
      { label: "Purchase Reports", icon: <BarChart3 size={18} />, path: "/reports/purchases" },
      { label: "Inventory Reports", icon: <BarChart3 size={18} />, path: "/reports/inventory" },
    ],
  },
  {
    label: "Medical aids",
    icon: <Stethoscope size={20} />,
    children: [
      { label: "List Medical Aids", icon: <ListOrdered size={18} />, path: "/medical-aids" },
      { label: "Add Medical Aid", icon: <PlusCircle size={18} />, path: "/medical-aids/add" },
    ],
  },
  {
    label: "Requests",
    icon: <FileQuestion size={20} />,
    children: [
      { label: "List Requests", icon: <ListOrdered size={18} />, path: "/requests" },
      { label: "Add Request", icon: <PlusCircle size={18} />, path: "/requests/add" },
    ],
  },
  {
    label: "Logs",
    icon: <ScrollText size={20} />,
    children: [
      { label: "Activity Logs", icon: <ScrollText size={18} />, path: "/logs/activity" },
      { label: "System Logs", icon: <ScrollText size={18} />, path: "/logs/system" },
    ],
  },
  { label: "Trashed", icon: <Trash2 size={20} />, path: "/trashed" },
  {
    label: "Sms",
    icon: <MessageSquare size={20} />,
    children: [
      { label: "Send SMS", icon: <MessageSquare size={18} />, path: "/sms/send" },
      { label: "SMS History", icon: <ListOrdered size={18} />, path: "/sms/history" },
    ],
  },
  { label: "List Access Requests", icon: <Star size={20} />, path: "/access-requests" },
  {
    label: "Mail",
    icon: <Mail size={20} />,
    children: [
      { label: "Inbox", icon: <Mail size={18} />, path: "/mail/inbox" },
      { label: "Sent", icon: <Mail size={18} />, path: "/mail/sent" },
    ],
  },
  { label: "Serial Nos", icon: <Hash size={20} />, path: "/serial-nos" },
  {
    label: "Cash",
    icon: <Wallet size={20} />,
    children: [
      { label: "Cash Flow", icon: <Wallet size={18} />, path: "/cash/flow" },
      { label: "Cash Reports", icon: <BarChart3 size={18} />, path: "/cash/reports" },
    ],
  },
  {
    label: "Calls",
    icon: <Phone size={20} />,
    children: [
      { label: "Call Log", icon: <Phone size={18} />, path: "/calls/log" },
      { label: "Schedule Call", icon: <Phone size={18} />, path: "/calls/schedule" },
    ],
  },
  {
    label: "Broadcast",
    icon: <Radio size={20} />,
    children: [
      { label: "Send Broadcast", icon: <Radio size={18} />, path: "/broadcast/send" },
      { label: "Broadcast History", icon: <ListOrdered size={18} />, path: "/broadcast/history" },
    ],
  },
  {
    label: "Targets",
    icon: <Target size={20} />,
    children: [
      { label: "Sales Targets", icon: <Target size={18} />, path: "/targets/sales" },
      { label: "Set Targets", icon: <PlusCircle size={18} />, path: "/targets/set" },
    ],
  },
  { label: "User Management", icon: <Users size={20} />, path: "/user-management-system" },
  { label: "Hearing aid Manual", icon: <BookOpen size={20} />, path: "/manual" },
];

export function Sidebar() {
  const { isAdmin } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-56 bg-[#1a1d29] text-white flex flex-col h-screen overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10">
        <h1 className="text-base font-semibold">Hearing Aid Labs</h1>
        <p className="text-xs text-white/60 mt-0.5">HALPOS</p>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="w-full flex items-center justify-between px-4 py-2 text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${expandedItems.includes(item.label) ? "" : "-rotate-90"
                      }`}
                  />
                </button>
                {expandedItems.includes(item.label) && (
                  <div className="bg-black/20">
                    {item.children
                      .filter((child) => !child.adminOnly || isAdmin)
                      .map((child) => (
                        child.action ? (
                          <button
                            key={child.label}
                            onClick={child.action}
                            className="w-full flex items-center gap-2 px-4 pl-10 py-1.5 text-xs transition-colors text-white/70 hover:bg-white/5 hover:text-white text-left"
                          >
                            <span>{child.label}</span>
                          </button>
                        ) : (
                          <NavLink
                            key={child.label}
                            to={child.path || "#"}
                            className={({ isActive }) =>
                              `flex items-center gap-2 px-4 pl-10 py-1.5 text-xs transition-colors ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                              }`
                            }
                          >
                            <span>{child.label}</span>
                          </NavLink>
                        )
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 transition-colors ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>


    </aside>
  );
}
