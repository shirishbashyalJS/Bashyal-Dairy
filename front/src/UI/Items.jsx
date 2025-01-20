import { useContext, useEffect, useState } from "react";
import { useItems } from "../hooks/items";
import { LoginContext } from "../App";
import axios from "axios";
import { Success } from "./Success";

function Items({ baseURL }) {
  const items = useItems(); // Use lowercase variable name for better readability
  const { login, setLogin } = useContext(LoginContext);
  const [success, setSuccess] = useState(false);
  const [quantities, setQuantities] = useState(
    items.reduce((acc, _, index) => ({ ...acc, [index]: 1 }), {})
  );
  const [cart, setCart] = useState({});

  // Handle quantity change
  const handleQuantity = (index, quantity) => {
    setQuantities((prev) => ({ ...prev, [index]: Number(quantity) }));
  };

  // Handle buy action
  const handleBuy = (item, quantity) => {
    const decision = confirm("Press Ok to confirm your order!");

    decision && setCart({ ...item, quantity: quantity });
  };
  useEffect(() => {
    if (Object.keys(cart).length) {
      //AXIOS
      axios
        .post(baseURL + "order", { user: login, product: cart })
        .then((res) => {
          setSuccess(true);
        })
        .catch((err) => {});
    }
  }, [cart]);

  return (
    <div
      className="items text-center m-2 pt-5"
      style={{ backgroundColor: "whitesmoke" }}
    >
      {success && (
        <Success
          success={success}
          setSuccess={setSuccess}
          message={"Successfully Purchased"}
        />
      )}
      <h1>Best Dairy Products By Bashyal Dairy.</h1>
      <div className="lists p-5">
        <ul className="d-flex flex-column align-items-center gap-5">
          {items.map((item, index) => {
            const { name, image, discription, mrp, disRate } = item;
            return (
              <li
                className="item pb-3"
                key={index}
                style={{ borderRadius: "5px" }}
              >
                <div
                  className="image p-1 w-100"
                  style={{ position: "relative" }}
                >
                  <img
                    src={image}
                    alt={"bashyal dairy " + name}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                  {login.promo.length > 0 && (
                    <div className="sticker">
                      <p className="fs-5">- Rs {mrp - disRate}</p>
                    </div>
                  )}
                </div>
                <div className="item-name pt-2">
                  <h2 style={{ textDecoration: "underline" }}>{name}</h2>
                </div>
                <div className="item-price pt-2">
                  <h3>
                    Rate:{" "}
                    <del className="fs-3">{login.promo.length > 0 && mrp}</del>{" "}
                    {login.promo.length > 0 ? disRate : mrp}
                  </h3>
                </div>
                <div className="discription fs-2">
                  <p>{discription}</p>
                </div>
                <div className="quantity submit">
                  <form>
                    <label htmlFor={`quantity-${index}`} className="fs-3">
                      Quantity:{" "}
                    </label>
                    <select
                      name="quantity"
                      id={`quantity-${index}`}
                      className="fs-3"
                      value={quantities[index]}
                      onChange={(e) => handleQuantity(index, e.target.value)}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="btn btn-primary fs-3"
                      style={{ width: "80%" }}
                      onClick={() => handleBuy(item, quantities[index])}
                    >
                      Buy
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Items;
