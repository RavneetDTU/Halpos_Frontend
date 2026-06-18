import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DeleteConfirmModal } from "../components/modals/DeleteConfirmModal";
import { ProcessModal } from "../components/modals/ProcessModal";
import { ViewDetailsModal } from "../components/modals/ViewDetailsModal";
import { StatusBadge } from "../components/ui/StatusBadge";

const refundData = [
  {
    id: 1,
    date: "11/01/2024 17:19:22",
    reference: "SALJ22024/0A/01/24",
    biller: "Royana",
    customerSurname: "Kojana",
    customerPhone: "0848491414",
    customerName: "Joanne",
    source: "Promotion",
    saleStatus: "Completed",
    grandTotal: "150.88",
    paid: "150.00",
    balance: "0.00",
    refundMethod: "No funds need to be Refunded",
  },
  {
    id: 2,
    date: "04/12/2024 15:17:17",
    reference: "SAL/22024/049/2024/9173",
    biller: "Ramona",
    customerSurname: "Mania",
    customerPhone: "0877891926",
    customerName: "Carol",
    source: "Refund",
    saleStatus: "Approved",
    grandTotal: "1,900.00",
    paid: "1,900.00",
    balance: "0.00",
    refundMethod: "Refund",
  },
];

function getStatusVariant(status: string): "success" | "warning" | "error" | "info" | "default" {
  switch (status.toLowerCase()) {
    case "completed":
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
}

export function ListRefund() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [activeRefund, setActiveRefund] = useState<(typeof refundData)[0] | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [viewDetailsModal, setViewDetailsModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const toggleRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedRows(prev =>
      prev.length === refundData.length ? [] : refundData.map(row => row.id)
    );
  };

  const toggleActionMenu = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (openActionMenu === id) {
      setOpenActionMenu(null);
      setMenuPos(null);
      return;
    }
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const dropdownHeight = 160;
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow >= dropdownHeight ? rect.bottom + 4 : rect.top - dropdownHeight - 4;
    setMenuPos({ top, left: rect.right - 240 });
    setOpenActionMenu(id);
    setActiveRefund(refundData.find((r) => r.id === id) ?? null);
  };

  const handleViewDetails = (refund: any) => {
    setViewDetailsModal({ isOpen: true, saleData: refund });
    setOpenActionMenu(null);
    setMenuPos(null);
  };

  const handleDeleteRefund = () => {
    setDeleteConfirmModal(true);
    setOpenActionMenu(null);
    setMenuPos(null);
  };

  const confirmDeleteRefund = () => {
    console.log('Refund deleted');
    setOpenActionMenu(null);
  };

  const handleApprove = () => {
    setApproveModal(true);
    setOpenActionMenu(null);
    setMenuPos(null);
  };

  const handleReject = () => {
    setRejectModal(true);
    setOpenActionMenu(null);
    setMenuPos(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('button') && !target.closest('.action-menu-fixed')) {
        setOpenActionMenu(null);
        setMenuPos(null);
      }
    };
    const handleScroll = () => { setOpenActionMenu(null); setMenuPos(null); };
    if (openActionMenu !== null) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
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
          <span className="text-gray-900">List Refund</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Sales (All Warehouses)</h1>
        <p className="text-sm text-gray-600 mt-1">
          Please use the table below to navigate or filter the results. You can download the table as excel and pdf.
        </p>
      </div>

      <div className="bg-white rounded border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option>All</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm text-gray-600">records</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm w-64"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-3 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === refundData.length}
                    onChange={toggleAll}
                    className="rounded border-white/30 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Date</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Reference No</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Biller</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Customer Surname</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Customer Phone</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Customer Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Marketing Source</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Sale Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Grand Total</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Paid</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Balance</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Refund Method</th>
                <th className="px-3 py-2 text-left text-xs font-medium whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {refundData.map((refund, index) => (
                <tr key={refund.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(refund.id)}
                      onChange={() => toggleRow(refund.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-900 whitespace-nowrap">{refund.date}</td>
                  <td className="px-3 py-3 text-xs font-medium text-blue-600 whitespace-nowrap">{refund.reference}</td>
                  <td className="px-3 py-3 text-xs text-gray-900">{refund.biller}</td>
                  <td className="px-3 py-3 text-xs text-gray-900">{refund.customerSurname}</td>
                  <td className="px-3 py-3 text-xs text-gray-600">{refund.customerPhone}</td>
                  <td className="px-3 py-3 text-xs text-gray-900">{refund.customerName}</td>
                  <td className="px-3 py-3 text-xs text-gray-600">{refund.source}</td>
                  <td className="px-3 py-3">
                    <StatusBadge status={refund.saleStatus} variant={getStatusVariant(refund.saleStatus)} />
                  </td>
                  <td className="px-3 py-3 text-xs font-medium text-gray-900">{refund.grandTotal}</td>
                  <td className="px-3 py-3 text-xs text-gray-900">{refund.paid}</td>
                  <td className="px-3 py-3 text-xs text-gray-900">{refund.balance}</td>
                  <td className="px-3 py-3 text-xs text-gray-600">{refund.refundMethod}</td>
                  <td className="px-3 py-3">
                    <button
                      onClick={(e) => toggleActionMenu(refund.id, e)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of{" "}
            <span className="font-medium">2</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors disabled:opacity-50 text-sm">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded hover:bg-white transition-colors text-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ViewDetailsModal
        isOpen={viewDetailsModal.isOpen}
        onClose={() => setViewDetailsModal({ isOpen: false, saleData: null })}
        saleData={viewDetailsModal.saleData}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        onConfirm={confirmDeleteRefund}
      />
      <ProcessModal
        isOpen={approveModal}
        onClose={() => setApproveModal(false)}
        type="approve"
      />
      <ProcessModal
        isOpen={rejectModal}
        onClose={() => setRejectModal(false)}
        type="reject"
      />

      {/* Fixed-position action dropdown */}
      {openActionMenu !== null && menuPos && activeRefund && (
        <div
          ref={menuRef}
          className="action-menu-fixed fixed w-60 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
          style={{ top: menuPos.top, left: menuPos.left, zIndex: 99999 }}
        >
          <button onClick={() => handleViewDetails(activeRefund)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span>👁️</span> Sale Details
          </button>
          <button onClick={handleDeleteRefund} className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2">
            <span>🗑️</span> Delete Refund
          </button>
          <button onClick={handleApprove} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span>✅</span> Approve
          </button>
          <button onClick={handleReject} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span>❌</span> Reject
          </button>
        </div>
      )}
    </div>
  );
}
