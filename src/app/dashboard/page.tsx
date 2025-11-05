export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <p>Invoices this month</p>
          <span className="font-bold text-yellow-600 text-lg">3</span>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p>Remaining (Free Plan)</p>
          <span className="font-bold text-yellow-600 text-lg">2</span>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p>Total Clients</p>
          <span className="font-bold text-yellow-600 text-lg">12</span>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <p>Plan</p>
          <span className="font-bold text-yellow-600 text-lg">Free</span>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="font-semibold mb-2 text-gray-800">Recent Invoices</h2>
        <table className="w-full text-left border-t border-gray-200">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="py-2">Client</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>Acme Cafe</td>
              <td>2025-10-01</td>
              <td>$120.00</td>
              <td>Sent</td>
            </tr>
            <tr className="border-t">
              <td>Jane Doe</td>
              <td>2025-09-27</td>
              <td>$55.00</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
