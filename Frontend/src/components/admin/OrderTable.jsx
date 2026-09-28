
function OrderTable({
  orders,
  onStatusChange,
}) {
  const statuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  function badgeColor(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>

              <th className="px-6 py-4 text-left">
                Order ID
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No orders found.
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-semibold">
                    #{order.id}
                  </td>

                  <td className="px-6 py-4">
                    {order.customer_name || "-"}
                  </td>

                  <td className="px-6 py-4">
                    {order.customer_email || "-"}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    KSh{" "}
                    {Number(
                      order.total_amount
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className={`px-3 py-2 rounded-lg border font-medium ${badgeColor(
                        order.status
                      )}`}
                    >

                      {statuses.map((status) => (

                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>

                      ))}

                    </select>

                  </td>

                  <td className="px-6 py-4">
                    {order.created_at
                      ? new Date(
                          order.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>

              ))
            )}

          </tbody>
        </table>

      </div>
    </div>
  );
}

export default OrderTable;

