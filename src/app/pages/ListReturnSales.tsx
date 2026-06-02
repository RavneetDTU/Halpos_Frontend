import { useEffect, useState } from "react";
import { AddPaymentModal } from "../components/modals/AddPaymentModal";
import { EmailSaleModal } from "../components/modals/EmailSaleModal";
import { ViewDetailsModal } from "../components/modals/ViewDetailsModal";
import { ViewPaymentModal } from "../components/modals/ViewPaymentModal";

export function ListReturnSales() {
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [viewDetailsModal, setViewDetailsModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [viewPaymentModal, setViewPaymentModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [addPaymentModal, setAddPaymentModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });
  const [emailSaleModal, setEmailSaleModal] = useState<{ isOpen: boolean; saleData: any }>({ isOpen: false, saleData: null });

  const returnSalesData = [
    {
      date: "07/12/2024 10:11:00",
      reference: "RETW8/2024/11/70/851",
      saleReference: "SAL/22024/042/1920",
      biller: "Hearing Aid Lab Limpopo (Pty) Ltd",
      customer: "Virgin Active Constantia",
      warehouse: "Virgin Active",
      salesStatus: "Completed",
      grandTotal: "0.00",
      paid: "-47,400.00",
      balance: "0.00",
    },
    {
      date: "14/12/2024 18:16:04",
      reference: "RETP42024/1600/001",
      saleReference: "SAL/22024/049/2024/5262",
      biller: "Test Biller",
      customer: "Walk in Customer",
      warehouse: "Sandton",
      salesStatus: "Completed",
      grandTotal: "0.00",
      paid: "-45.00",
      balance: "0.00",
    },
    {
      date: "11/12/2024 16:01:06",
      reference: "RETX82024/1600/001",
      saleReference: "SAL/22024/049/2024/5262",
      biller: "Test Biller",
      customer: "Walk in Customer",
      warehouse: "Sandton",
      salesStatus: "Completed",
      grandTotal: "0.00",
      paid: "-45.00",
      balance: "0.00",
    },
     {
      date: "14/12/2024 18:16:04",
      reference: "RETP42024/1600/001",
      saleReference: "SAL/22024/049/2024/5262",
      biller: "Test Biller",
      customer: "Walk in Customer",
      warehouse: "Sandton",
      salesStatus: "Completed",
      grandTotal: "0.00",
      paid: "-45.00",
      balance: "0.00",
    },
     {
      date: "14/12/2024 18:16:04",
      reference: "RETP42024/1600/001",
      saleReference: "SAL/22024/049/2024/5262",
      biller: "Test Biller",
      customer: "Walk in Customer",
      warehouse: "Sandton",
      salesStatus: "Completed",
      grandTotal: "0.00",
      paid: "-45.00",
      balance: "0.00",
    },
  ].map((d, i) => ({ ...d, id: i + 1 }));

  const toggleActionMenu = (id: number) => setOpenActionMenu(prev => prev === id ? null : id);
  const handleViewDetails = (sale: any) => { setViewDetailsModal({ isOpen: true, saleData: sale }); setOpenActionMenu(null); };
  const handleViewPayments = (sale: any) => { setViewPaymentModal({ isOpen: true, saleData: sale }); setOpenActionMenu(null); };
  const handleAddPayment = (sale: any) => { setAddPaymentModal({ isOpen: true, saleData: sale }); setOpenActionMenu(null); };
  const handleEmailSale = (sale: any) => { setEmailSaleModal({ isOpen: true, saleData: sale }); setOpenActionMenu(null); };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('button') && !(e.target as HTMLElement).closest('.action-menu')) {
        setOpenActionMenu(null);
      }
    };
    if (openActionMenu !== null) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openActionMenu]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Return Sales</h2>
          <p className="text-sm text-gray-600">
            Please use the table below to navigate or filter the results. You can download the table as excel and pdf.
          </p>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search:</span>
              <input
                type="text"
                className="px-2 py-1 border border-gray-300 rounded text-sm w-48"
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded overflow-visible">
            <div className="relative overflow-visible">
              <table className="w-full text-xs">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Reference No</th>
                  <th className="px-3 py-2 text-left font-medium">Sale Reference</th>
                  <th className="px-3 py-2 text-left font-medium">Biller</th>
                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-left font-medium">Warehouse</th>
                  <th className="px-3 py-2 text-left font-medium">Sales Status</th>
                  <th className="px-3 py-2 text-left font-medium">Grand Total</th>
                  <th className="px-3 py-2 text-left font-medium">Paid</th>
                  <th className="px-3 py-2 text-left font-medium">Balance</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {returnSalesData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 py-2">{item.date}</td>
                    <td className="px-3 py-2 text-blue-600">{item.reference}</td>
                    <td className="px-3 py-2 text-blue-600">{item.saleReference}</td>
                    <td className="px-3 py-2">{item.biller}</td>
                    <td className="px-3 py-2">{item.customer}</td>
                    <td className="px-3 py-2">{item.warehouse}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                        {item.salesStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2">{item.grandTotal}</td>
                    <td className="px-3 py-2">{item.paid}</td>
                    <td className="px-3 py-2">{item.balance}</td>
                    <td className="relative px-3 py-2 overflow-visible">
                      <button onClick={() => toggleActionMenu(item.id)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                        Actions
                      </button>
                      {openActionMenu === item.id && (
                        <div className="
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
  ">
                          <button onClick={() => handleViewDetails(item)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>👁️</span> Sale Details
                          </button>
                          <button onClick={() => handleViewPayments(item)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>💳</span> View Payment
                          </button>
                          <button onClick={() => handleAddPayment(item)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>➕</span> Add Payment
                          </button>
                          <button className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>📄</span> Download as PDF
                          </button>
                          <button onClick={() => handleEmailSale(item)} className="w-full px-4 py-2 text-left text-xs hover:bg-gray-100 flex items-center gap-2">
                            <span>📧</span> Email Sale
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">Showing 1 to 3 of 168 entries</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
      <ViewDetailsModal isOpen={viewDetailsModal.isOpen} onClose={() => setViewDetailsModal({ isOpen: false, saleData: null })} saleData={viewDetailsModal.saleData} />
      <ViewPaymentModal isOpen={viewPaymentModal.isOpen} onClose={() => setViewPaymentModal({ isOpen: false, saleData: null })} saleData={viewPaymentModal.saleData} />
      <AddPaymentModal isOpen={addPaymentModal.isOpen} onClose={() => setAddPaymentModal({ isOpen: false, saleData: null })} saleData={addPaymentModal.saleData} />
      <EmailSaleModal isOpen={emailSaleModal.isOpen} onClose={() => setEmailSaleModal({ isOpen: false, saleData: null })} saleData={emailSaleModal.saleData} />
    </div>
  );
}
