import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //Provide the data
  //dont need to pass anything as we already pass the loader in the routes. The react will know automatically.
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2 ">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

//create the loader
//export as the named export. This will be async because it has the function that fetches the data.
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
