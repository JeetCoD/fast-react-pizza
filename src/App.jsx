import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import { createOrder } from "./services/apiRestaurant";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
//In this function we pass the routes. Pass array object where each object is one route.
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //error handle for incorrect path
    errorElement: <Error />,
    //children property for children routes
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        //Provide the loader
        loader: menuLoader,
        //this error element will show when the is error in the menu.
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        //Provide the action to where it has been created.
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        //this error element will show when the is error in the order.
        errorElement: <Error />,
        action: updateOrderAction,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    //RouterProvider component we pass the router porp which contains the path we created.
    <RouterProvider router={router} />
  );
}

export default App;
