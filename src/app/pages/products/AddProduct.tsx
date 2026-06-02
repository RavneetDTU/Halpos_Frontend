import { useState } from "react";
import {
  Package,
  Plus,
  Trash2,
  Upload,
  Building2,
  Tag,
  DollarSign,
  ChevronDown,
} from "lucide-react";

const categories = ["Hearing Aids", "Accessories", "Batteries", "Services", "Other"];
const brands = ["Phonak", "Signia", "Oticon", "Widex", "Resound", "Starkey", "Internal", "Other"];
const units = ["Unit", "Pack", "Pair", "Box", "Service"];
const taxOptions = ["No Tax", "VAT 15%", "VAT 0%"];
const warehouses = ["HEAD OFFICE", "BRANCH 1 — BLUFF", "BRANCH 2 — HILLCREST"];

interface StockEntry {
  warehouse: string;
  qty: number;
}

export function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    code: "",
    category: "",
    brand: "",
    unit: "Unit",
    costPrice: "",
    salePrice: "",
    tax: "No Tax",
    description: "",
    imageUrl: "",
    status: "Active",
    alertQty: "",
  });
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([
    { warehouse: "HEAD OFFICE", qty: 0 },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addStockEntry = () =>
    setStockEntries((prev) => [...prev, { warehouse: warehouses[0], qty: 0 }]);

  const updateStockEntry = (idx: number, key: keyof StockEntry, val: string | number) =>
    setStockEntries((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, [key]: val } : e))
    );

  const removeStockEntry = (idx: number) =>
    setStockEntries((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>Home</span><span>/</span>
        <span>Products</span><span>/</span>
        <span className="text-gray-900 font-medium">Add Product</span>
      </div>

      <div className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Add New Product</h1>
        <p className="text-sm text-gray-500 mt-0.5">Fields marked with * are required</p>
      </div>

      {submitted && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
          <Package size={16} className="text-green-600" />
          Product added successfully!
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* Main Product Info */}
        <div className="col-span-2 space-y-4">
          {/* Basic Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <Tag size={16} className="text-blue-600" />
              <h2 className="text-sm font-semibold text-gray-800">Product Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Phonak Audeo Paradise P90-R"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product Code / SKU *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => updateField("code", e.target.value)}
                  placeholder="e.g. HA-001"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category *</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                <div className="relative">
                  <select
                    value={form.brand}
                    onChange={(e) => updateField("brand", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                  >
                    <option value="">Select Brand</option>
                    {brands.map((b) => <option key={b}>{b}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Unit of Measure</label>
                <div className="relative">
                  <select
                    value={form.unit}
                    onChange={(e) => updateField("unit", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                  >
                    {units.map((u) => <option key={u}>{u}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Product description..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <DollarSign size={16} className="text-green-600" />
              <h2 className="text-sm font-semibold text-gray-800">Pricing</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cost Price (ZAR) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R</span>
                  <input
                    type="number"
                    value={form.costPrice}
                    onChange={(e) => updateField("costPrice", e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Sale Price (ZAR) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R</span>
                  <input
                    type="number"
                    value={form.salePrice}
                    onChange={(e) => updateField("salePrice", e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tax</label>
                <div className="relative">
                  <select
                    value={form.tax}
                    onChange={(e) => updateField("tax", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                  >
                    {taxOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Alert Qty (Low Stock)</label>
                <input
                  type="number"
                  value={form.alertQty}
                  onChange={(e) => updateField("alertQty", e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>
            {form.costPrice && form.salePrice && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <span className="text-xs text-green-700">
                  Margin: R {(parseFloat(form.salePrice) - parseFloat(form.costPrice)).toFixed(2)} 
                  &nbsp;(
                  {(((parseFloat(form.salePrice) - parseFloat(form.costPrice)) / parseFloat(form.costPrice)) * 100).toFixed(1)}%)
                </span>
              </div>
            )}
          </div>

          {/* Warehouse Stock */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-purple-600" />
                <h2 className="text-sm font-semibold text-gray-800">Opening Stock by Warehouse</h2>
              </div>
              <button
                onClick={addStockEntry}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus size={13} /> Add Warehouse
              </button>
            </div>
            <div className="space-y-2">
              {stockEntries.map((entry, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <select
                        value={entry.warehouse}
                        onChange={(e) => updateStockEntry(i, "warehouse", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none bg-white"
                      >
                        {warehouses.map((w) => <option key={w}>{w}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      value={entry.qty}
                      onChange={(e) => updateStockEntry(i, "qty", parseInt(e.target.value) || 0)}
                      placeholder="Qty"
                      min={0}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-center"
                    />
                  </div>
                  <button
                    onClick={() => removeStockEntry(i)}
                    disabled={stockEntries.length === 1}
                    className="p-1.5 rounded hover:bg-red-50 text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Total Opening Stock: <span className="font-semibold text-gray-900">{stockEntries.reduce((acc, e) => acc + Number(e.qty), 0)} units</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-3">Product Image</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors cursor-pointer">
              <Upload size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">Or enter image URL</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Package size={16} />
              <h2 className="text-sm font-semibold">Product Summary</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-200">Name</span>
                <span className="font-medium text-right max-w-32 truncate">{form.name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">SKU</span>
                <span className="font-medium">{form.code || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Category</span>
                <span className="font-medium">{form.category || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Sale Price</span>
                <span className="font-medium">{form.salePrice ? `R ${form.salePrice}` : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Total Stock</span>
                <span className="font-medium">{stockEntries.reduce((acc, e) => acc + Number(e.qty), 0)} units</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <button
              id="submit-product-btn"
              onClick={handleSubmit}
              className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Product
            </button>
            <button
              onClick={() => {
                setForm({ name: "", code: "", category: "", brand: "", unit: "Unit", costPrice: "", salePrice: "", tax: "No Tax", description: "", imageUrl: "", status: "Active", alertQty: "" });
                setStockEntries([{ warehouse: "HEAD OFFICE", qty: 0 }]);
              }}
              className="w-full py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
