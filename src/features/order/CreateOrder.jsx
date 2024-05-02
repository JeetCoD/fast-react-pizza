import { useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPizzaPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //just as we have the loader data access, we have the action data access.
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPizzaPrice);
  const PriorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + PriorityPrice;
  const isLoadingAddress = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* Create the form */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow ">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-800 p-2 bg-red-100 border-red-800 border rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              className="input w-full"
              type="text"
              defaultValue={address}
              name="address"
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-800 p-2 bg-red-100 border-red-800 border rounded-md">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-4 w-4 accent-teal-600 focus:ring-2 focus:ring-teal-400  focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium " htmlFor="priority">
            Want to give your order priority?
          </label>
        </div>
        {/* Convert the cart data to string. Beacause we can pass whole object. */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude}, ${position.longitude}`
              : ""
          }
        />
        <div>
          <Button type="primary" disabled={isSubmitting || isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//Create action function.
//When the form is submitted the form will intercept with the action function as soon the react router is connected. The form will pass the request that is submitted.
export async function action({ request }) {
  //formData is used to get the formData. It is browser function.
  const formData = await request.formData();
  //In below method we convert the data into Object.
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    //convert data back to Object
    cart: JSON.parse(data.cart),
    //return true if = on or it will return false.
    priority: data.priority === "true",
  };
  console.log(order);
  //handling the errors
  const errors = {};
  //checking if the phone number is valid
  if (!isValidPhone(order.phone))
    //if not valid then phone error will be created and added in the errors object with key = phone
    errors.phone =
      "Please give your correct number, we might need to contact you. ";
  //checks if there is any keys in error by lenght property. If there is, we will return the errors.
  if (Object.keys(errors).length > 0) return errors;
  //The create order return that data. So we will s
  const newOrder = await createOrder(order);

  //!: DO NOT OVERUSE THIS.
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
