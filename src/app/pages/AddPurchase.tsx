import { Upload, Plus, UserPlus, Settings as SettingsIcon } from "lucide-react";

export function AddPurchase() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border border-gray-300 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Add Purchase</h2>
          <p className="text-sm text-gray-600">
            Please fill in the information below. The field labels marked with * are required input fields.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="datetime-local"
              defaultValue="2025-12-24T13:08"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference No</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-gray-50"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse *</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>HEAD OFFICE</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Preordered</option>
              <option>Received</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attach Document</label>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2">
              <Upload size={14} />
              Browse
            </button>
          </div>
        </div>

        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
          <p className="text-sm text-yellow-800">Please select these before adding any product</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
          <div className="flex items-center gap-2">
            <select className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Hearing Aid Labs - HEAD OFFICE</option>
            </select>
            <button className="p-1.5 text-blue-600">
              <UserPlus size={16} />
            </button>
            <button className="p-1.5 text-blue-600">
              <SettingsIcon size={16} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="border border-gray-300 rounded p-3 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl">📦</span>
              <span className="text-sm">Please add products to order list</span>
            </div>
            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Order Items</h3>
          <div className="border border-gray-300 rounded overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-2 py-2 text-left font-medium">Product Name (Product Code)</th>
                  <th className="px-2 py-2 text-left font-medium">Serial No</th>
                  <th className="px-2 py-2 text-left font-medium">Serial No2</th>
                  <th className="px-2 py-2 text-left font-medium">Net Unit Cost</th>
                  <th className="px-2 py-2 text-left font-medium">Quantity</th>
                  <th className="px-2 py-2 text-left font-medium">Discount</th>
                  <th className="px-2 py-2 text-left font-medium">Product Tax (%)</th>
                  <th className="px-2 py-2 text-left font-medium">Subtotal (ZAR)</th>
                  <th className="px-2 py-2 text-left font-medium">Customer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={9} className="px-2 py-6 text-center text-gray-500 text-sm">
                    No items added
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-gray-300" />
            More Options
          </label>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Tax</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>NO VAT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (0/0%)</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Term</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Sent</label>
            <input
              type="date"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Method Of Delivery</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. Of Bags Sent</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. of Bags Received</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
          <div className="border border-gray-300 rounded">
            <div className="border-b border-gray-300 bg-gray-50 px-2 py-1 flex gap-1 text-xs">
              <button className="px-1 hover:bg-gray-200 rounded">B</button>
              <button className="px-1 hover:bg-gray-200 rounded">I</button>
              <button className="px-1 hover:bg-gray-200 rounded">U</button>
            </div>
            <textarea
              rows={3}
              className="w-full px-2 py-1.5 text-sm focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex justify-start gap-2 mt-4">
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
