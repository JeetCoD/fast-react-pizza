import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  //isLoading will be true if state is = loading
  //by placing this here this mean it is universal loader for whole app as useNavigation get state of whole app if loading, idle or submitting
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {/* This code will run only when the isLoadig is true */}
      {isLoading && <Loader />}   

      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          {/* Outlet is used to display the child routes element */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
