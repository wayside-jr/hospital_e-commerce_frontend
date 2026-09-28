
import {
  Package,
  ShoppingBag,
  DollarSign,
  Boxes,
} from "lucide-react";

const icons = {
  products: Package,
  orders: ShoppingBag,
  revenue: DollarSign,
  stock: Boxes,
};

function StatsCard({
  title,
  value,
  type,
}) {
  const Icon = icons[type];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-full">
          <Icon
            className="text-blue-600"
            size={28}
          />
        </div>

      </div>
    </div>
  );
}

export default StatsCard;

