import { StatusBadge } from "../components/ui/StatusBadge";
import { useState, useEffect, useCallback } from "react";
import {
  Search, RefreshCw, Loader2, AlertCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { ViewDetailsModal } from "../components/modals/ViewDetailsModal";
import { ViewPaymentModal } from "../components/modals/ViewPaymentModal";
import { AddPaymentModal } from "../components/modals/AddPaymentModal";
import { EmailSaleModal } from "../components/modals/EmailSaleModal";
import { DeleteConfirmModal } from "../components/modals/DeleteConfirmModal";
import { NotWorking } from "./NotWorking";
import { apiFetch } from "../lib/api";

// ─── Type ─────────────────────────────────────────────────────────────────────
interface PurchaseRecord {
  id: number;
  date: string;
  reference?: string;
  supplier?: string;
  supplierPhone?: string;
  warehouse?: string;
  purchaseStatus?: string;
  status?: string;
  paymentStatus?: string;
  grandTotal?: number | string;
  paid?: number | string;
  balance?: number | string;
  notes?: string;
  [key: string]: unknown;
}

function getStatusVariant(
  status: string,
): "success" | "warning" | "error" | "info" | "default" {
  switch (status.toLowerCase()) {
    case "received":
    case "completed":
      return "success";
    case "ordered":
    case "preordered":
      return "info";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function fmtAmt(val: number | string | undefined): string {
  if (val == null) return "—";
  return Number(val).toLocaleString("en-ZA", { minimumFractionDigits: 2 });
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ListPurchases() {
  // ── API data ──────────────────────────────────────────────────────────────
  const [purchaseData, setPurchaseData] = useState<PurchaseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const loadPurchases = useCallback(async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const raw = await apiFetch<unknown>("/purchases");
      console.log("[GET /purchases] raw:", raw);
      let records: PurchaseRecord[] = [];
      if (Array.isArray(raw)) {
        records = raw as PurchaseRecord[];
      } else if (raw && typeof raw === "object") {
        const obj = raw as Record<string, unknown>;
        const candidate = obj.data ?? obj.items ?? obj.purchases ?? obj.results;
        if (Array.isArray(candidate)) records = candidate as PurchaseRecord[];
      }
      setPurchaseData(records);
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : "Failed to load purchases");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadPurchases(); }, [loadPurchases]);

  // ── Table state ───────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);

  const filteredData = purchaseData.filter((p) => {
    const q = search.toLowerCase();
    return !q ||
      (p.supplier ?? "").toLowerCase().includes(q) ||
      (p.reference ?? "").toLowerCase().includes(q) ||
      (p.notes ?? "").toLowerCase().includes(q);
  });

  // ── Modals ────────────────────────────────────────────────────────────────
  const [viewDetailsModal, setViewDetailsModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [viewPaymentModal, setViewPaymentModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [addPaymentModal, setAddPaymentModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [notWorkingModal, setNotWorkingModal] = useState(false);

  const toggleActionMenu = (id: number) =>
    setOpenActionMenu((prev) => (prev === id ? null : id));

  const handleViewDetails = (p: any) => { setViewDetailsModal({ isOpen: true, saleData: p }); setOpenActionMenu(null); };
  const handleViewPayments = (p: any) => { setViewPaymentModal({ isOpen: true, saleData: p }); setOpenActionMenu(null); };
  const handleAddPayment = (p: any) => { setAddPaymentModal({ isOpen: true, saleData: p }); setOpenActionMenu(null); };
  const handleEmail = (p: any) => { setEmailModal({ isOpen: true, saleData: p }); setOpenActionMenu(null); };
  const handleDelete = () => setDeleteConfirmModal(true);
  const confirmDelete = () => { setOpenActionMenu(null); };
  const handleNotWorking = () => { setNotWorkingModal(true); setOpenActionMenu(null); };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest("button") &&
        !(e.target as HTMLElement).closest(".action-menu")
      ) setOpenActionMenu(null);
    };
    if (openActionMenu !== null) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openActionMenu]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border border-gray-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Purchases (All Warehouses)
            </h2>
            <p className="text-sm text-gray-600">
              Please use the table below to navigate or filter the results.
            </p>
          </div>
          <a
            href="/purchases/add"
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors font-medium"
          >
            + Add Purchase
          </a>
        </div>

        <div className="p-4">
          {/* Search + Refresh */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={loadPurchases}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-300 rounded overflow-visible relative">
            <table className="w-full text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Reference No</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Supplier</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Supplier Phone</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Warehouse</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Purchase Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Grand Total</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Paid</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Balance</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Payment Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Note</th>
                  <th className="px-3 py-2 text-left text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Loading */}
                {isLoading && (
                  <tr>
                    <td colSpan={12} className="px-4 py-16 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <Loader2 size={18} className="animate-spin text-blue-500" />
                        Loading purchases…
                      </div>
                    </td>
                  </tr>
                )}
                {/* Error */}
                {!isLoading && fetchError && (
                  <tr>
                    <td colSpan={12} className="px-4 py-16 text-center">
                      <div className="flex items-center justify-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {fetchError}
                      </div>
                    </td>
                  </tr>
                )}
                {/* Empty */}
                {!isLoading && !fetchError && filteredData.length === 0 && (
                  <tr>
                    <td colSpan={12} className="px-4 py-16 text-center text-gray-400 text-sm">
                      No purchases found
                    </td>
                  </tr>
                )}
                {/* Data rows */}
                {!isLoading && !fetchError && filteredData.map((purchase, index) => (
                  <tr
                    key={purchase.id}
                    className={`hover:bg-gray-100 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-3 py-2 text-xs text-gray-900">
                      {purchase.date ? formatDate(purchase.date) : ""}
                    </td>
                    <td className="px-3 py-2 text-xs text-blue-600 font-medium">
                      {purchase.reference ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      {purchase.supplier ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">
                      {purchase.supplierPhone ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600">
                      {purchase.warehouse ?? "—"}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={(purchase.status || purchase.purchaseStatus || "") as string}
                        variant={getStatusVariant((purchase.status || purchase.purchaseStatus || "") as string)}
                      />
                    </td>
                    <td className="px-3 py-2 text-xs font-medium text-gray-900">
                      {fmtAmt(purchase.grandTotal)}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      {fmtAmt(purchase.paid)}
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-900">
                      {fmtAmt(purchase.balance)}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={purchase.paymentStatus ?? ""}
                        variant={getStatusVariant(purchase.paymentStatus ?? "")}
                      />
                    </td>
                    <td className="px-3 py-2 text-xs text-gray-600 max-w-[140px] truncate">
                      {purchase.notes ?? ""}
                    </td>
                    <td className="px-3 py-2 relative">
                      <button
                        onClick={() => toggleActionMenu(purchase.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        Actions
                      </button>
                      {openActionMenu === purchase.id && (
                        <div className="action-menu absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[999] overflow-hidden">
                          <button onClick={() => handleViewDetails(purchase)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>👁️</span> Purchase Details
                          </button>
                          <button onClick={() => handleViewPayments(purchase)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>💳</span> View Payment
                          </button>
                          <button onClick={() => handleAddPayment(purchase)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>➕</span> Add Payment
                          </button>
                          <button onClick={handleNotWorking} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>✏️</span> Edit Purchase
                          </button>
                          <button className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>📄</span> Download as PDF
                          </button>
                          <button onClick={() => handleEmail(purchase)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>📧</span> Email Purchase
                          </button>
                          <button onClick={handleNotWorking} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>↩️</span> Return Purchase
                          </button>
                          <button onClick={handleDelete} className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2">
                            <span>🗑️</span> Delete Purchase
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination info */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData.length}</span> of{" "}
              <span className="font-medium">{purchaseData.length}</span> results
            </div>
            <div className="flex gap-1 items-center">
              <button className="p-1.5 rounded border border-gray-200 hover:bg-white transition-colors text-sm">
                <ChevronLeft size={14} />
              </button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs">1</button>
              <button className="p-1.5 rounded border border-gray-200 hover:bg-white transition-colors text-sm">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewDetailsModal
        isOpen={viewDetailsModal.isOpen}
        onClose={() => setViewDetailsModal({ isOpen: false, saleData: null })}
        saleData={viewDetailsModal.saleData}
      />
      <ViewPaymentModal
        isOpen={viewPaymentModal.isOpen}
        onClose={() => setViewPaymentModal({ isOpen: false, saleData: null })}
        saleData={viewPaymentModal.saleData}
      />
      <AddPaymentModal
        isOpen={addPaymentModal.isOpen}
        onClose={() => setAddPaymentModal({ isOpen: false, saleData: null })}
        saleData={addPaymentModal.saleData}
      />
      <EmailSaleModal
        isOpen={emailModal.isOpen}
        onClose={() => setEmailModal({ isOpen: false, saleData: null })}
        saleData={emailModal.saleData}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        onConfirm={confirmDelete}
      />
      {notWorkingModal && (
        <div className="fixed inset-0 z-50" onClick={() => setNotWorkingModal(false)}>
          <NotWorking />
        </div>
      )}
    </div>
  );
}