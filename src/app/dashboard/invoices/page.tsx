"use client";

import { useState } from "react";

export default function InvoicesPage() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, unit: "pcs", price: 0 }]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [format, setFormat] = useState("Standard");

  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const total = subtotal + subtotal * (tax / 100) - discount;

  const addItem = () => setItems([...items, { description: "", qty: 1, unit: "pcs", price: 0 }]);

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left: Invoice Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Invoice</h2>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Client Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Client Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="client@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Line Items
            </label>
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(idx, "description", e.target.value)}
                  className="flex-1 border rounded px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) => updateItem(idx, "qty", Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={item.unit}
                  onChange={(e) => updateItem(idx, "unit", e.target.value)}
                  className="w-20 border rounded px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
                  className="w-24 border rounded px-2 py-1"
                />
              </div>
            ))}
            <button
              onClick={addItem}
              className="text-sm text-yellow-600 hover:underline mt-1"
            >
              + Add Item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tax (%)</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Discount ($)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Invoice Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option>Standard</option>
              <option>Modern</option>
              <option>Minimal</option>
            </select>
          </div>

          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
            onClick={() => alert("Preview and send function coming soon!")}
          >
            Preview Invoice
          </button>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-3 text-gray-700">
          Invoice Preview ({format})
        </h3>

        <div className="border p-4 rounded text-sm">
          <p className="font-semibold text-gray-800 mb-2">Bill To:</p>
          <p>{clientName || "Client Name"}</p>
          <p>{clientEmail || "client@example.com"}</p>

          <table className="w-full mt-4 border-t border-gray-200">
            <thead className="text-gray-600 text-sm">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i, idx) => (
                <tr key={idx} className="border-t">
                  <td>{i.description || "-"}</td>
                  <td>{i.qty}</td>
                  <td>{i.unit}</td>
                  <td>${i.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: {tax}%</p>
            <p>Discount: ${discount.toFixed(2)}</p>
            <p className="font-bold text-yellow-600 text-lg">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
