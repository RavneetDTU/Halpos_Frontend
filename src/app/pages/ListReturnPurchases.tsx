export function ListReturnPurchases() {
  const returnPurchasesData = [
    {
      date: "27/11/2024 11:08:00",
      reference: "2824V1/0003",
      purchaseReference: "PO2025/046/78094",
      supplier: "Hearing Aid Labs - HEAD OFFICE",
      surcharge: "0.00",
      grandTotal: "0.00",
    },
    {
      date: "01/11/2024 11:08:00",
      reference: "2824V1/0002",
      purchaseReference: "PO2025/046/78095",
      supplier: "Hearing Aid Labs - HEAD OFFICE",
      surcharge: "0.00",
      grandTotal: "-32,333.72",
    },
    {
      date: "24/11/2024 14:38:00",
      reference: "PO2025/N1/0744",
      purchaseReference: "PO2025/N1/0744",
      supplier: "Hearing Aid Labs - HEAD OFFICE",
      surcharge: "0.00",
      grandTotal: "-27,400.01",
    },
    {
      date: "14/11/2017 14:28:00",
      reference: "201721/1/0003",
      purchaseReference: "PO2025/N1/0746",
      supplier: "Hearing Aid Labs - HEAD OFFICE",
      surcharge: "0.00",
      grandTotal: "104.12",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Return Purchases</h2>
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

          <div className="border border-gray-300 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Reference No</th>
                  <th className="px-3 py-2 text-left font-medium">Purchase Reference</th>
                  <th className="px-3 py-2 text-left font-medium">Supplier</th>
                  <th className="px-3 py-2 text-left font-medium">Surcharge</th>
                  <th className="px-3 py-2 text-left font-medium">Grand Total</th>
                  <th className="px-3 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {returnPurchasesData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 py-2 text-xs">{item.date}</td>
                    <td className="px-3 py-2 text-xs text-blue-600">{item.reference}</td>
                    <td className="px-3 py-2 text-xs text-blue-600">{item.purchaseReference}</td>
                    <td className="px-3 py-2 text-xs">{item.supplier}</td>
                    <td className="px-3 py-2 text-xs">{item.surcharge}</td>
                    <td className="px-3 py-2 text-xs">{item.grandTotal}</td>
                    <td className="px-3 py-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                        Actions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">Showing 1 to 5 of 5 entries</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm" disabled>Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
