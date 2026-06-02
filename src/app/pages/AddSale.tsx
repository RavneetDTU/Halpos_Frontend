import { useState } from "react";
import { Plus, Edit, Settings as SettingsIcon, Clock, X, AlertTriangle } from "lucide-react";
import { BackorderModal } from "../components/modals/BackorderModal";

interface OrderItem {
  id: number;
  name: string;
  sku: string;
  serialNo1: string;
  serialNo2: string;
  unitCost: number;
  qty: number;
  discount: number;
  tax: number;
  subtotal: number;
  isBackorder: boolean;
}

const mockProductCatalog = [
  { id: 1, name: "Phonak Audeo Paradise P90-R", sku: "HA-001", unitCost: 6500, stock: 0 },
  { id: 2, name: "Signia Pure Charge&Go AX 7", sku: "HA-002", unitCost: 5900, stock: 5 },
  { id: 3, name: "Phonak TV Connector", sku: "ACC-001", unitCost: 599, stock: 8 },
  { id: 4, name: "Roger Select iN", sku: "ACC-002", unitCost: 2900, stock: 0 },
  { id: 5, name: "Size 312 Batteries (6-pack)", sku: "BAT-001", unitCost: 89, stock: 142 },
  { id: 6, name: "Annual Service & Clean", sku: "SERV-001", unitCost: 450, stock: 999 },
];

export function AddSale() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [backorderModal, setBackorderModal] = useState<{
    open: boolean;
    product: typeof mockProductCatalog[0] | null;
  }>({ open: false, product: null });
  const [backorderNotes, setBackorderNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddProduct = (product: typeof mockProductCatalog[0]) => {
    setShowProductPicker(false);
    if (product.stock === 0) {
      setBackorderModal({ open: true, product });
    } else {
      addItemToOrder(product, false);
    }
  };

  const addItemToOrder = (product: typeof mockProductCatalog[0], isBackorder: boolean) => {
    const newItem: OrderItem = {
      id: Date.now(),
      name: product.name,
      sku: product.sku,
      serialNo1: "",
      serialNo2: "",
      unitCost: product.unitCost,
      qty: 1,
      discount: 0,
      tax: 15,
      subtotal: product.unitCost,
      isBackorder,
    };
    setOrderItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: number) => setOrderItems((prev) => prev.filter((i) => i.id !== id));

  const updateItem = (id: number, field: keyof OrderItem, value: any) => {
    setOrderItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        updated.subtotal =
          updated.unitCost * updated.qty * (1 - updated.discount / 100);
        return updated;
      })
    );
  };

  const hasBackorderItems = orderItems.some((i) => i.isBackorder);
  const subtotal = orderItems.reduce((acc, i) => acc + i.subtotal, 0);
  const taxAmount = orderItems.reduce((acc, i) => acc + (i.subtotal * i.tax) / 100, 0);
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>Home</span><span>/</span>
        <span>Sales</span><span>/</span>
        <span className="text-gray-900 font-medium">Add Sale</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Add Sale</h2>
          <p className="text-sm text-gray-500">Fields marked with * are required.</p>
        </div>

        {submitted && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
            ✅ Sale submitted successfully!
          </div>
        )}

        {/* Basic Fields */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="datetime-local"
              defaultValue="2026-05-21T12:07"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Reference No</label>
            <input
              type="text"
              defaultValue="SAL/2026/045/1627"
              readOnly
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Biller *</label>
            <input
              type="text"
              defaultValue="Test Biller"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Paid By</label>
            <input
              type="text"
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">⚠ Please select Warehouse and Customer before adding products</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Warehouse *</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>HEAD OFFICE</option>
              <option>BRANCH 1 — BLUFF</option>
              <option>BRANCH 2 — HILLCREST</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer *</label>
            <div className="flex items-center gap-2">
              <select className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Select Customer</option>
                <option>Sarah Johnson</option>
                <option>Michael Brown</option>
                <option>Emma Wilson</option>
              </select>
              <button className="p-1.5 text-blue-600 hover:text-blue-700"><Edit size={16} /></button>
              <button className="p-1.5 text-blue-600 hover:text-blue-700"><SettingsIcon size={16} /></button>
            </div>
          </div>
        </div>

        {/* Product picker trigger */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">Order Items</h3>
            <button
              id="open-product-picker-btn"
              onClick={() => setShowProductPicker(!showProductPicker)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          {/* Inline Product Picker */}
          {showProductPicker && (
            <div className="border border-blue-200 rounded-lg bg-blue-50 p-3 mb-3">
              <p className="text-xs font-medium text-gray-700 mb-2">Select a product to add:</p>
              <div className="grid grid-cols-2 gap-2">
                {mockProductCatalog.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleAddProduct(p)}
                    className={`flex items-start gap-2 p-2.5 bg-white border rounded-lg text-left hover:border-blue-400 transition-colors ${
                      p.stock === 0 ? "border-red-200" : "border-gray-200"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.sku} • R {p.unitCost.toLocaleString()}</p>
                    </div>
                    {p.stock === 0 ? (
                      <span className="flex items-center gap-0.5 text-xs text-red-600 font-medium flex-shrink-0">
                        <AlertTriangle size={11} /> Out
                      </span>
                    ) : (
                      <span className="text-xs text-green-600 font-medium flex-shrink-0">{p.stock} left</span>
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowProductPicker(false)}
                className="mt-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Items Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-2 py-2 text-left font-medium">Product Name (SKU)</th>
                  <th className="px-2 py-2 text-left font-medium">Serial No 1</th>
                  <th className="px-2 py-2 text-left font-medium">Serial No 2</th>
                  <th className="px-2 py-2 text-center font-medium">Unit Price</th>
                  <th className="px-2 py-2 text-center font-medium">Qty</th>
                  <th className="px-2 py-2 text-center font-medium">Discount %</th>
                  <th className="px-2 py-2 text-center font-medium">Tax %</th>
                  <th className="px-2 py-2 text-right font-medium">Subtotal (ZAR)</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {orderItems.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-2 py-8 text-center text-gray-400">
                      <div className="text-2xl mb-1">📦</div>
                      No items added yet — click "Add Product" above
                    </td>
                  </tr>
                )}
                {orderItems.map((item) => (
                  <tr key={item.id} className={`border-t border-gray-100 ${item.isBackorder ? "bg-orange-50" : "bg-white"}`}>
                    <td className="px-2 py-2">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-gray-500">{item.sku}</p>
                        {item.isBackorder && (
                          <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                            <Clock size={10} /> Awaiting Stock
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.serialNo1}
                        onChange={(e) => updateItem(item.id, "serialNo1", e.target.value)}
                        className="w-full px-1.5 py-1 border border-gray-200 rounded text-xs"
                        placeholder="SN1"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="text"
                        value={item.serialNo2}
                        onChange={(e) => updateItem(item.id, "serialNo2", e.target.value)}
                        className="w-full px-1.5 py-1 border border-gray-200 rounded text-xs"
                        placeholder="SN2"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.unitCost}
                        onChange={(e) => updateItem(item.id, "unitCost", parseFloat(e.target.value))}
                        className="w-20 px-1.5 py-1 border border-gray-200 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.qty}
                        min={1}
                        onChange={(e) => updateItem(item.id, "qty", parseInt(e.target.value))}
                        className="w-14 px-1.5 py-1 border border-gray-200 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.discount}
                        min={0} max={100}
                        onChange={(e) => updateItem(item.id, "discount", parseFloat(e.target.value))}
                        className="w-14 px-1.5 py-1 border border-gray-200 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.tax}
                        min={0} max={100}
                        onChange={(e) => updateItem(item.id, "tax", parseFloat(e.target.value))}
                        className="w-14 px-1.5 py-1 border border-gray-200 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-2 py-2 text-right font-semibold text-gray-900">
                      R {item.subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              {orderItems.length > 0 && (
                <tfoot className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <td colSpan={7} className="px-2 py-2 text-right text-xs text-gray-500 font-medium">Subtotal</td>
                    <td className="px-2 py-2 text-right text-xs font-semibold">R {subtotal.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</td>
                    <td />
                  </tr>
                  <tr>
                    <td colSpan={7} className="px-2 py-1 text-right text-xs text-gray-500 font-medium">VAT</td>
                    <td className="px-2 py-1 text-right text-xs font-semibold">R {taxAmount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</td>
                    <td />
                  </tr>
                  <tr className="bg-blue-600 text-white">
                    <td colSpan={7} className="px-2 py-2 text-right text-xs font-bold">Grand Total</td>
                    <td className="px-2 py-2 text-right text-sm font-bold">R {grandTotal.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Backorder Notes */}
        {hasBackorderItems && (
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={15} className="text-orange-600" />
              <p className="text-sm font-semibold text-orange-800">Backorder Items Detected</p>
            </div>
            <p className="text-xs text-orange-700 mb-3">
              Some items in this order are on backorder. The customer will be notified when stock arrives.
            </p>
            <label className="block text-xs font-medium text-gray-700 mb-1">Backorder Notes</label>
            <textarea
              rows={2}
              value={backorderNotes}
              onChange={(e) => setBackorderNotes(e.target.value)}
              placeholder="Add notes for the customer regarding expected delivery of backordered items..."
              className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            />
          </div>
        )}

        {/* Order Settings */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Order Tax</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>NO VAT</option>
              <option>VAT 15%</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Order Discount</label>
            <input type="number" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sale Status *</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Completed</option>
              <option>Pending</option>
              {hasBackorderItems && <option value="backorder">Backorder</option>}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Payment Term</label>
            <input type="text" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Payment Status *</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>Pending</option>
              <option>Paid</option>
              <option>Partial</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Diagnosis</label>
            <input type="text" className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Payment Plan</label>
            <textarea rows={3} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Staff Note</label>
            <textarea rows={3} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none resize-none" />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            id="submit-sale-btn"
            onClick={() => { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Sale
          </button>
          <button
            onClick={() => { setOrderItems([]); setBackorderNotes(""); }}
            className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Backorder Modal */}
      <BackorderModal
        isOpen={backorderModal.open}
        onClose={() => setBackorderModal({ open: false, product: null })}
        onAddBackorder={() => {
          if (backorderModal.product) {
            addItemToOrder(backorderModal.product, true);
          }
          setBackorderModal({ open: false, product: null });
        }}
        productName={backorderModal.product?.name ?? ""}
        requestedQty={1}
        availableQty={backorderModal.product?.stock ?? 0}
      />
    </div>
  );
}
