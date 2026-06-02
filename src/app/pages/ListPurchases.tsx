import { StatusBadge } from "../components/ui/StatusBadge";
import { useState, useEffect } from "react";
import { ViewDetailsModal } from "../components/modals/ViewDetailsModal";
import { ViewPaymentModal } from "../components/modals/ViewPaymentModal";
import { AddPaymentModal } from "../components/modals/AddPaymentModal";
import { EmailSaleModal } from "../components/modals/EmailSaleModal";
import { DeleteConfirmModal } from "../components/modals/DeleteConfirmModal";
import { NotWorking } from "./NotWorking";

const purchaseData = [
  {
    id: 1,
    preordered: "✖",
    color: "red",
    date: "12/05/2025 08:24:34",
    reference: "POZS350290VH1",
    supplier: "Hearing Aid Labs -HEAD OFFICE",
    status: "preordered",
    grandTotal: "0.00",
    paid: "0.00",
    balance: "0.00",
    paymentStatus: "pending",
    note: "Weekly Madness Cashup Alan White",
  },
  {
    id: 2,
    preordered: "✖",
    color: "red",
    date: "11/06/2025 13:02:21",
    reference: "POZS13290VH1",
    supplier: "Hearing Aid Labs -HEAD OFFICE",
    status: "preordered",
    grandTotal: "11,500.00",
    paid: "0.00",
    balance: "11,500.00",
    paymentStatus: "pending",
    note: "Will fix Cashup Alan White Full Cashup Hearing Test Jed Total Jud Keds Cash Keds Tele Bank Cash 38 Slip 1",
  },
  {
    id: 3,
    preordered: "✔",
    color: "green",
    date: "11/06/2025 10:12:10",
    reference: "POZS354290VH1",
    supplier: "Hearing Aid Labs -HEAD OFFICE",
    status: "preordered",
    grandTotal: "40,203.81",
    paid: "0.00",
    balance: "40,203.81",
    paymentStatus: "pending",
    note: "Q- Keds 44 Q-Keds 34 Will fix Cashup Hearing Test W- Will Bank Cashup Right",
  },

  {
    id: 4,
    preordered: "✔",
    color: "green",
    date: "11/06/2025 10:06:05",
    reference: "POZS329GH1",
    supplier: "Hearing Aid Labs -HEAD OFFICE",
    status: "preordered",
    grandTotal: "40,691.27",
    paid: "0.00",
    balance: "40,691.27",
    paymentStatus: "pending",
    note: "Q-KEDZUPL-CASH 4,000.00 CARD 35,169.25 HEARING TEST 1500.00 W-FALL 1021.02",
  },
];

function getStatusVariant(
  status: string,
): "success" | "warning" | "error" | "info" | "default" {
  switch (status.toLowerCase()) {
    case "received":
      return "success";
    case "preordered":
      return "info";
    case "pending":
      return "warning";
    default:
      return "default";
  }
}

export function ListPurchases() {
  const [openActionMenu, setOpenActionMenu] = useState<
    number | null
  >(null);
  const [viewDetailsModal, setViewDetailsModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [viewPaymentModal, setViewPaymentModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [addPaymentModal, setAddPaymentModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [emailModal, setEmailModal] = useState<{
    isOpen: boolean;
    saleData: any;
  }>({ isOpen: false, saleData: null });
  const [deleteConfirmModal, setDeleteConfirmModal] =
    useState(false);
  const [notWorkingModal, setNotWorkingModal] = useState(false);

  const [printBarcodeModal, setPrintBarcodeModal] =
    useState(false);
  const [deliveryAttachmentModal, setDeliveryAttachmentModal] =
    useState(false);
  const [addDeliveryModal, setAddDeliveryModal] =
    useState(false);

  const toggleActionMenu = (id: number) =>
    setOpenActionMenu((prev) => (prev === id ? null : id));
  const handleViewDetails = (p: any) => {
    setViewDetailsModal({ isOpen: true, saleData: p });
    setOpenActionMenu(null);
  };
  const handleViewPayments = (p: any) => {
    setViewPaymentModal({ isOpen: true, saleData: p });
    setOpenActionMenu(null);
  };
  const handleAddPayment = (p: any) => {
    setAddPaymentModal({ isOpen: true, saleData: p });
    setOpenActionMenu(null);
  };
  const handleEmail = (p: any) => {
    setEmailModal({ isOpen: true, saleData: p });
    setOpenActionMenu(null);
  };
  const handleDelete = () => setDeleteConfirmModal(true);
  const confirmDelete = () => {
    console.log("Deleted");
    setOpenActionMenu(null);
  };
  const handleNotWorking = () => {
    setNotWorkingModal(true);
    setOpenActionMenu(null);
  };

  const handlePrintBarcode = () => {
    setPrintBarcodeModal(true);
    setOpenActionMenu(null);
  };

  const handleDeliveryAttachment = () => {
    setDeliveryAttachmentModal(true);
    setOpenActionMenu(null);
  };

  const handleAddDeliveryAttachment = () => {
    setAddDeliveryModal(true);
    setOpenActionMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !(e.target as HTMLElement).closest("button") &&
        !(e.target as HTMLElement).closest(".action-menu")
      ) {
        setOpenActionMenu(null);
      }
    };
    if (openActionMenu !== null)
      document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, [openActionMenu]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Purchases (All Warehouses)
          </h2>
          <p className="text-sm text-gray-600">
            Please use the table below to navigate or filter the
            results. You can download the table as excel and
            pdf.
          </p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Status
              </label>
              <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option>All</option>
                <option>Preordered</option>
                <option>Received</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Warehouse
              </label>
              <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm">
                <option>All</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Export
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Show
              </span>
              <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">
                entries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Search:
              </span>
              <input
                type="text"
                className="px-2 py-1 border border-gray-300 rounded text-sm w-48"
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded overflow-visible relative">
            <table className="w-full text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">
                    Preordered
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Date
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Reference No
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Supplier
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Purchase Status
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Grand Total
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Paid
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Balance
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Payment Status
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Note
                  </th>
                  <th className="px-3 py-2 text-left font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchaseData.map((purchase, index) => (
                  <tr
                    key={purchase.id}
                    className={
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }
                  >
                    <td className="px-3 py-2">
                      <span
                        className={`text-lg ${purchase.color === "red" ? "text-red-600" : "text-green-600"}`}
                      >
                        {purchase.preordered}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.date}
                    </td>
                    <td className="px-3 py-2 text-xs text-blue-600">
                      {purchase.reference}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.supplier}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={purchase.status}
                        variant={getStatusVariant(
                          purchase.status,
                        )}
                      />
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.grandTotal}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.paid}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.balance}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={purchase.paymentStatus}
                        variant={getStatusVariant(
                          purchase.paymentStatus,
                        )}
                      />
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {purchase.note}
                    </td>
                    <td className="px-3 py-2 relative">
                      <button
                        onClick={() =>
                          toggleActionMenu(purchase.id)
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                      >
                        Actions
                      </button>
                      {openActionMenu === purchase.id && (
                        <div className="action-menu absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-50">
                          <button
                            onClick={() =>
                              handleViewDetails(purchase)
                            }
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>👁️</span> Purchase Details
                          </button>
                          <button
                            onClick={() =>
                              handleViewPayments(purchase)
                            }
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>💳</span> View Payment
                          </button>
                          <button
                            onClick={() =>
                              handleAddPayment(purchase)
                            }
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>➕</span> Add Payment
                          </button>
                          <button
                            onClick={handleNotWorking}
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>✏️</span> Edit Purchase
                          </button>
                          <button className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>📄</span> Download as PDF
                          </button>
                          <button
                            onClick={() =>
                              handleEmail(purchase)
                            }
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>📧</span> Email Purchase
                          </button>
                          <button
                            onClick={handlePrintBarcode}
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>🖨️</span>
                            Print Barcode
                          </button>
                          <button
                            onClick={handleNotWorking}
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>↩️</span> Return Purchase
                          </button>
                          <button
                            onClick={handleDelete}
                            className="w-full px-4 py-2 text-left text-xs hover:bg-red-50 text-red-600 flex items-center gap-2"
                          >
                            <span>🗑️</span> Delete Purchase
                          </button>
                          <button
                            onClick={handleDeliveryAttachment}
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>📎</span>
                            View Delivery Attachment
                          </button>
                          <button
                            onClick={
                              handleAddDeliveryAttachment
                            }
                            className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span>➕</span>
                            Add Delivery Attachment
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing 1 to 4 of 4 entries
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <EmailSaleModal
        isOpen={emailModal.isOpen}
        onClose={() =>
          setEmailModal({ isOpen: false, saleData: null })
        }
        saleData={emailModal.saleData}
      />
      <DeleteConfirmModal
        isOpen={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(false)}
        onConfirm={confirmDelete}
      />
      {notWorkingModal && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setNotWorkingModal(false)}
        >
          <NotWorking />
        </div>
      )}

      {printBarcodeModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-6xl rounded shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-xl font-semibold">
                Print Barcode/Label
              </h2>

              <button
                onClick={() => setPrintBarcodeModal(false)}
                className="text-3xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="bg-green-100 border border-green-200 text-green-700 p-3 rounded mb-5">
                products added to list
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium">
                  Add Product
                </label>

                <input
                  placeholder="Add Item"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="border rounded overflow-hidden mb-5">
                <table className="w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3 text-left">
                        Product Name
                      </th>

                      <th className="p-3">Quantity</th>

                      <th className="p-3">Variants</th>

                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="p-3">
                        audifon Receiver Unit
                      </td>

                      <td className="p-3">
                        <input
                          defaultValue="1"
                          className="border w-20 px-2 py-1"
                        />
                      </td>

                      <td></td>

                      <td className="text-center">×</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Style *
                </label>

                <select className="w-full border rounded px-3 py-2">
                  <option>24 per sheet (a4)</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button className="bg-blue-600 text-white px-5 py-2 rounded">
                  Update
                </button>

                <button className="bg-red-500 text-white px-5 py-2 rounded">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {deliveryAttachmentModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-10">
          <div className="bg-white w-full max-w-5xl shadow-2xl border border-gray-300">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2
                className="
text-[14px]
font-bold
uppercase
text-[#333]
tracking-tight
"
              >
                VIEW DELIVERY UPLOADS
              </h2>

              <div className="flex items-center gap-4">
                <button
                  className="
border
px-3
py-1
text-[12px]
font-normal
text-[#444]
flex
items-center
gap-1
hover:bg-gray-50
"
                >
                  🖨 Print
                </button>

                <button
                  onClick={() =>
                    setDeliveryAttachmentModal(false)
                  }
                  className="
text-[42px]
leading-none
font-light
text-gray-400
hover:text-gray-700
"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="border border-gray-300">
                <table className="w-full">
                  <thead
                    className="
bg-[#3498db]
text-white
text-[13px]
font-bold
"
                  >
                    <tr>
                      <th className="py-3 border-r">
                        date uploaded
                      </th>

                      <th className="py-3 border-r">
                        Created by
                      </th>

                      <th className="py-3 border-r">
                        Attachment
                      </th>

                      <th className="py-3 border-r">Note</th>

                      <th className="py-3">action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      className="
text-[12px]
text-[#555]
h-[60px]
"
                    >
                      <td className="text-center border-r">
                        —
                      </td>

                      <td className="text-center border-r">
                        —
                      </td>

                      <td className="text-center border-r">
                        —
                      </td>

                      <td className="text-center border-r">
                        —
                      </td>

                      <td className="text-center">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {addDeliveryModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center pt-10">
          <div className="bg-white w-full max-w-3xl border border-gray-300 shadow-2xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <h2
                className="
text-[14px]
font-bold
uppercase
text-[#333]
"
              >
                UPLOAD DELIVERY ATTACHMENT
              </h2>

              <button
                onClick={() => setAddDeliveryModal(false)}
                className="
text-[42px]
leading-none
font-light
text-gray-400
hover:text-gray-700
"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              <div className="mb-6">
                <label
                  className="
block
mb-2
text-[13px]
font-bold
text-[#333]
"
                >
                  Attachment
                </label>

                <div className="flex">
                  <input
                    className="
flex-1
border
border-gray-300
h-[36px]
px-3
text-[12px]
"
                  />

                  <button
                    className="
bg-[#3498db]
px-4
text-white
text-[12px]
font-bold
hover:bg-[#2980b9]
"
                  >
                    📂 Browse ...
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="
block
mb-2
text-[13px]
font-bold
text-[#333]
"
                >
                  Note
                </label>

                <textarea
                  rows={9}
                  className="
w-full
border
border-gray-300
resize-none
p-3
text-[12px]
"
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="
bg-[#3498db]
px-8
py-2
text-white
text-[12px]
font-bold
uppercase
hover:bg-[#2980b9]
"
                >
                  upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}