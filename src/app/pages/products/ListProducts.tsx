import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  warehouse: string;
  status: "Active" | "Inactive";
}

const mockProducts: Product[] = [
  { id: 1, sku: "HA-001", name: "Phonak Audeo Paradise P90-R", category: "Hearing Aids", brand: "Phonak", unit: "Unit", costPrice: 4200, salePrice: 6500, stock: 12, warehouse: "HEAD OFFICE", status: "Active" },
  { id: 2, sku: "HA-002", name: "Signia Pure Charge&Go AX 7", category: "Hearing Aids", brand: "Signia", unit: "Unit", costPrice: 3800, salePrice: 5900, stock: 3, warehouse: "HEAD OFFICE", status: "Active" },
  { id: 3, sku: "ACC-001", name: "Phonak TV Connector", category: "Accessories", brand: "Phonak", unit: "Unit", costPrice: 320, salePrice: 599, stock: 8, warehouse: "BRANCH 1", status: "Active" },
  { id: 4, sku: "ACC-002", name: "Roger Select iN", category: "Accessories", brand: "Phonak", unit: "Unit", costPrice: 1800, salePrice: 2900, stock: 0, warehouse: "HEAD OFFICE", status: "Active" },
  { id: 5, sku: "BAT-001", name: "Size 312 Batteries (6-pack)", category: "Batteries", brand: "Phonak", unit: "Pack", costPrice: 45, salePrice: 89, stock: 142, warehouse: "HEAD OFFICE", status: "Active" },
  { id: 6, sku: "HA-003", name: "Oticon More 1 miniRITE R", category: "Hearing Aids", brand: "Oticon", unit: "Unit", costPrice: 3500, salePrice: 5200, stock: 2, warehouse: "BRANCH 1", status: "Active" },
  { id: 7, sku: "SERV-001", name: "Annual Service & Clean", category: "Services", brand: "Internal", unit: "Service", costPrice: 200, salePrice: 450, stock: 999, warehouse: "HEAD OFFICE", status: "Active" },
  { id: 8, sku: "HA-004", name: "Widex MOMENT 440", category: "Hearing Aids", brand: "Widex", unit: "Unit", costPrice: 4100, salePrice: 6200, stock: 0, warehouse: "BRANCH 2", status: "Inactive" },
];

const warehouses = ["All Warehouses", "HEAD OFFICE", "BRANCH 1", "BRANCH 2"];
const categories = ["All Categories", "Hearing Aids", "Accessories", "Batteries", "Services"];

function getStockStatus(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
  if (stock <= 3) return { label: "Low Stock", color: "bg-orange-100 text-orange-700" };
  return { label: "In Stock", color: "bg-green-100 text-green-700" };
}

export function ListProducts() {
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const filtered = mockProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchWarehouse = warehouseFilter === "All Warehouses" || p.warehouse === warehouseFilter;
    const matchCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchWarehouse && matchCategory && matchStatus;
  });

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter((p) => p.status === "Active").length;
  const lowStockProducts = mockProducts.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const outOfStockProducts = mockProducts.filter((p) => p.stock === 0).length;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span>Home</span><span>/</span>
        <span>Products</span><span>/</span>
        <span className="text-gray-900 font-medium">List Products</span>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">Browse and manage all products across warehouses</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600">
            <Download size={15} /> Export
          </button>
          {isAdmin && (
            <a
              href="/products/add"
              id="go-to-add-product"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Package size={15} /> Add Product
            </a>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Total Products", value: totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active", value: activeProducts, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "Low Stock", value: lowStockProducts, icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Out of Stock", value: outOfStockProducts, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
        ].map((k) => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${k.bg} rounded-lg flex items-center justify-center`}>
              <k.icon size={20} className={k.color} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{k.label}</p>
              <p className="text-2xl font-bold text-gray-900">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, SKU or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
        >
          {warehouses.map((w) => <option key={w}>{w}</option>)}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
        >
          <option value="All">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Filter size={13} /> {filtered.length} results
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">SKU</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Product Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Category</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Brand</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Warehouse</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium whitespace-nowrap">Cost (ZAR)</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium whitespace-nowrap">Sale (ZAR)</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Stock</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((p, i) => {
              const stockStatus = getStockStatus(p.stock);
              return (
                <tr key={p.id} className={`hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{p.sku}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.unit}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-700">{p.category}</td>
                  <td className="px-4 py-3 text-xs text-gray-700">{p.brand}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{p.warehouse}</td>
                  <td className="px-4 py-3 text-xs text-right font-medium text-gray-900">
                    R {p.costPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-xs text-right font-semibold text-green-700">
                    R {p.salePrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-gray-900">{p.stock}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${stockStatus.color}`}>
                        {stockStatus.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewProduct(p)}
                        className="p-1.5 rounded hover:bg-blue-50 text-blue-600 transition-colors"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      {isAdmin && (
                        <>
                          <button className="p-1.5 rounded hover:bg-green-50 text-green-600 transition-colors" title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-16 text-center">
                  <Package size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No products found matching your filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-xs text-gray-500">Showing {filtered.length} of {totalProducts} products</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded border border-gray-200 hover:bg-white transition-colors"><ChevronLeft size={14} /></button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs">1</button>
            <button className="p-1.5 rounded border border-gray-200 hover:bg-white transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* View Product Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
              <button onClick={() => setViewProduct(null)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Package size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{viewProduct.name}</p>
                  <p className="text-xs text-gray-500">{viewProduct.sku} • {viewProduct.brand}</p>
                </div>
              </div>
              {[
                ["Category", viewProduct.category],
                ["Unit", viewProduct.unit],
                ["Warehouse", viewProduct.warehouse],
                ["Cost Price", `R ${viewProduct.costPrice.toLocaleString()}`],
                ["Sale Price", `R ${viewProduct.salePrice.toLocaleString()}`],
                ["Stock Qty", String(viewProduct.stock)],
                ["Status", viewProduct.status],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-500">{key}</span>
                  <span className="font-medium text-gray-900">{val}</span>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setViewProduct(null)} className="w-full py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
