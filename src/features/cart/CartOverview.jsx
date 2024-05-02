import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaPrice, getTotalPizzaQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalPizzaQuantity);
  const totalCartValue = useSelector(getTotalPizzaPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="bg-zinc-800 px-4 py-4 uppercase text-stone-200 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartValue)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
