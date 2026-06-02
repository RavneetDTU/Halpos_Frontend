import {
  Download,
  FileText,
  Plus,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { KPICard } from "../components/ui/KPICard";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ViewPaymentModal } from "../components/modals/ViewPaymentModal";
import { AddPaymentModal } from "../components/modals/AddPaymentModal";
import { ViewDetailsModal } from "../components/modals/ViewDetailsModal";
import { ReturnSaleModal } from "../components/modals/ReturnSaleModal";
import { EmailSaleModal } from "../components/modals/EmailSaleModal";
import { AddDeliveryModal } from "../components/modals/AddDeliveryModal";
import { ProposeRefundModal } from "../components/modals/ProposeRefundModal";
import { DeleteConfirmModal } from "../components/modals/DeleteConfirmModal";
import { NotWorking } from "./NotWorking";

const kpiData = [
  {
    title: "Total Sales",
    value: "1,284",
    trend: { value: "+12.5%", isPositive: true },
    icon: TrendingUp,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Revenue",
    value: "$428,650",
    trend: { value: "+8.2%", isPositive: true },
    icon: DollarSign,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    title: "Pending Payments",
    value: "$52,340",
    trend: { value: "-3.1%", isPositive: true },
    icon: Clock,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    title: "Completed Orders",
    value: "1,089",
    trend: { value: "+15.3%", isPositive: true },
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
  },
  {
    title: "Refund Amount",
    value: "$12,450",
    trend: { value: "+2.4%", isPositive: false },
    icon: XCircle,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
  },
  {
    title: "Active Customers",
    value: "842",
    trend: { value: "+18.7%", isPositive: true },
    icon: Users,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
];

const salesData = [
  {
    id: 1,
    date: "2026-05-10",
    reference: "SAL-2026-001234",
    biller: "John Smith",
    customerName: "Sarah",
    customerPhone: "+1 234-567-8901",
    customerSurname: "Johnson",
    source: "Google Ads",
    saleStatus: "Completed",
    grandTotal: "$2,450.00",
    paid: "$2,450.00",
    balance: "$0.00",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    date: "2026-05-10",
    reference: "SAL-2026-001235",
    biller: "Emily Davis",
    customerName: "Michael",
    customerPhone: "+1 234-567-8902",
    customerSurname: "Brown",
    source: "Facebook",
    saleStatus: "Pending",
    grandTotal: "$1,890.00",
    paid: "$945.00",
    balance: "$945.00",
    paymentStatus: "Partial",
  },
  {
    id: 3,
    date: "2026-05-09",
    reference: "SAL-2026-001236",
    biller: "John Smith",
    customerName: "Emma",
    customerPhone: "+1 234-567-8903",
    customerSurname: "Wilson",
    source: "Direct",
    saleStatus: "Completed",
    grandTotal: "$3,200.00",
    paid: "$3,200.00",
    balance: "$0.00",
    paymentStatus: "Paid",
  },
  {
    id: 4,
    date: "2026-05-09",
    reference: "SAL-2026-001237",
    biller: "Robert Lee",
    customerName: "James",
    customerPhone: "+1 234-567-8904",
    customerSurname: "Taylor",
    source: "Referral",
    saleStatus: "Cancelled",
    grandTotal: "$1,650.00",
    paid: "$0.00",
    balance: "$1,650.00",
    paymentStatus: "Pending",
  },
  {
    id: 5,
    date: "2026-05-08",
    reference: "SAL-2026-001238",
    biller: "Emily Davis",
    customerName: "Olivia",
    customerPhone: "+1 234-567-8905",
    customerSurname: "Martinez",
    source: "Google Ads",
    saleStatus: "Refunded",
    grandTotal: "$2,100.00",
    paid: "$2,100.00",
    balance: "-$2,100.00",
    paymentStatus: "Refunded",
  },
];

function getStatusVariant(
  status: string,
): "success" | "warning" | "error" | "info" | "default" {
  switch (status.toLowerCase()) {
    case "completed":
    case "paid":
      return "success";
    case "pending":
    case "partial":
      return "warning";
    case "cancelled":
    case "refunded":
      return "error";
    default:
      return "default";
  }
}

const warehouseOptions = ["All Warehouses", "HEAD OFFICE", "BRANCH 1", "BRANCH 2"];

export function SalesManagement() {
  const [selectedRows, setSelectedRows] = useState<number[]>(
    [],
  );
  const [openActionMenu, setOpenActionMenu] = useState<
    number | null
  >(null);
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [viewPaymentModal, setViewPaymentModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [addPaymentModal, setAddPaymentModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [viewDetailsModal, setViewDetailsModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [returnSaleModal, setReturnSaleModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [emailSaleModal, setEmailSaleModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [addDeliveryModal, setAddDeliveryModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [proposeRefundModal, setProposeRefundModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [deleteConfirmModal, setDeleteConfirmModal] =
    useState(false);
  const [notWorkingModal, setNotWorkingModal] = useState(false);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id],
    );
  };

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === salesData.length
        ? []
        : salesData.map((row) => row.id),
    );
  };

  const toggleActionMenu = (id: number) => {
    setOpenActionMenu((prev) => (prev === id ? null : id));
  };

  const handleViewDetails = (sale: any) => {
    setViewDetailsModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleViewPayments = (sale: any) => {
    setViewPaymentModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleAddPayment = (sale: any) => {
    setAddPaymentModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleReturnSale = (sale: any) => {
    setReturnSaleModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleEmailSale = (sale: any) => {
    setEmailSaleModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleAddDelivery = (sale: any) => {
    setAddDeliveryModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleEditSale = () => {
    setNotWorkingModal(true);
    setOpenActionMenu(null);
  };

  const handleProposeRefund = (sale: any) => {
    setProposeRefundModal({ isOpen: true, saleData: sale });
    setOpenActionMenu(null);
  };

  const handleDeleteSale = () => {
    setDeleteConfirmModal(true);
  };

  const confirmDeleteSale = () => {
    // Handle delete logic here
    console.log("Sale deleted");
    setOpenActionMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("button") &&
        !target.closest(".action-menu")
      ) {
        setOpenActionMenu(null);
      }
    };

    if (openActionMenu !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openActionMenu]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>Home</span>
          <span>/</span>
          <span>Sales</span>
          <span>/</span>
          <span className="text-gray-900">List Sales</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">
          Sales
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {warehouseFilter === "All Warehouses" ? "All Warehouses" : warehouseFilter} — Use the filters below to search and export results.
        </p>
      </div>

      <div className="bg-white rounded border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-6 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Warehouse
            </label>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm bg-blue-50"
            >
              {warehouseOptions.map((w) => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Product
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Ads Filter
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>Select Ads</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Source
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>All</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200 overflow-visible">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm text-gray-600">
              records
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm w-64"
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-visible">
          <table className="w-full">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedRows.length === salesData.length
                    }
                    onChange={toggleAll}
                    className="rounded border-white/30 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Reference No
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Biller
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Customer Surname
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Customer Phone
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Customer Name
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Marketing Source
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Sale Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Grand Total
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Paid
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Balance
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Payment Status
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesData.map((sale, index) => (
                <tr
                  key={sale.id}
                  className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(sale.id)}
                      onChange={() => toggleRow(sale.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.date}
                  </td>
                  <td className="px-3 py-3 text-xs font-medium text-blue-600">
                    {sale.reference}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.biller}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.customerSurname}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600">
                    {sale.customerPhone}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.customerName}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600">
                    {sale.source}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge
                      status={sale.saleStatus}
                      variant={getStatusVariant(
                        sale.saleStatus,
                      )}
                    />
                  </td>
                  <td className="px-3 py-3 text-xs font-medium text-gray-900">
                    {sale.grandTotal}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.paid}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900">
                    {sale.balance}
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge
                      status={sale.paymentStatus}
                      variant={getStatusVariant(
                        sale.paymentStatus,
                      )}
                    />
                  </td>
                  <td className="relative px-3 py-3 overflow-visible">
                    <button
                      onClick={() => toggleActionMenu(sale.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Actions
                    </button>

                    {openActionMenu === sale.id && (
                      <div
                        className="
    action-menu
    absolute
    right-0
    top-full
    mt-2
    z-[999]
    w-60
    overflow-hidden
    rounded-xl
    border
    border-gray-200
    bg-white
    shadow-2xl
  "
                      >
                        <button
                          onClick={() =>
                            handleViewDetails(sale)
                          }
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>👁️</span> Sales Details
                        </button>
                        <button
                          onClick={() =>
                            handleViewPayments(sale)
                          }
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>💳</span> View Payments
                        </button>
                        <button
                          onClick={() => handleAddPayment(sale)}
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>➕</span> Add Payment
                        </button>
                        <button
                          onClick={() => handleReturnSale(sale)}
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>↩️</span> Return Sale
                        </button>
                        <button
                          onClick={() => handleEmailSale(sale)}
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>📧</span> Email Invoice
                        </button>
                        <button className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2">
                          <span>📄</span> Download as PDF
                        </button>
                        <button
                          onClick={handleEditSale}
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>✏️</span> Edit sale
                        </button>
                        <button
                          onClick={handleDeleteSale}
                          className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                        >
                          <span>🗑️</span> Delete Sale
                        </button>
                        <button
                          onClick={() =>
                            handleProposeRefund(sale)
                          }
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>🖨️</span> Propose a refund
                        </button>
                        <button
                          onClick={() =>
                            handleAddDelivery(sale)
                          }
                          className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <span>🚚</span> Add Delivery
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">1,284</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors disabled:opacity-50 text-sm">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors text-sm">
              3
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors text-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewDetailsModal
        isOpen={viewDetailsModal.isOpen}
        onClose={() =>
          setViewDetailsModal({ isOpen: false, saleData: null })
        }
        saleData={viewDetailsModal.saleData}
      />
      <ViewPaymentModal
        isOpen={viewPaymentModal.isOpen}
        onClose={() =>
          setViewPaymentModal({ isOpen: false, saleData: null })
        }
        saleData={viewPaymentModal.saleData}
      />
      <AddPaymentModal
        isOpen={addPaymentModal.isOpen}
        onClose={() =>
          setAddPaymentModal({ isOpen: false, saleData: null })
        }
        saleData={addPaymentModal.saleData}
      />
      <ReturnSaleModal
        isOpen={returnSaleModal.isOpen}
        onClose={() =>
          setReturnSaleModal({ isOpen: false, saleData: null })
        }
        saleData={returnSaleModal.saleData}
      />
      <EmailSaleModal
        isOpen={emailSaleModal.isOpen}
        onClose={() =>
          setEmailSaleModal({ isOpen: false, saleData: null })
        }
        saleData={emailSaleModal.saleData}
      />
      <AddDeliveryModal
        isOpen={addDeliveryModal.isOpen}
        onClose={() =>
          setAddDeliveryModal({ isOpen: false, saleData: null })
        }
        saleData={addDeliveryModal.saleData}
      />
      <ProposeRefundModal
        isOpen={proposeRefundModal.isOpen}
        onClose={() =>
          setProposeRefundModal({
            isOpen: false,
            saleData: null,
          })
        }
        saleData={proposeRefundModal.saleData}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        onConfirm={confirmDeleteSale}
      />

      {notWorkingModal && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setNotWorkingModal(false)}
        >
          <NotWorking />
        </div>
      )}
    </div>
  );
}