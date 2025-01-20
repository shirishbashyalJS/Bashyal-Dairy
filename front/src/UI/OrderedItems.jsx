import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";
import axios from "axios";
import { Spinner } from "./Spinner";

export const OrderedItems = ({ baseURL }) => {
  const [orderItems, setOrderItems] = useState([]);
  const { login } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}order`, {
        headers: login,
      })
      .then((res) => {
        setOrderItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("505 Error");
      });
  }, []);
  useEffect(() => {
    if (orderItems.length > 0) {
      const totalTemp = orderItems.reduce((total, indi) => {
        const isPromo = indi.user.promo.length > 0;
        return isPromo
          ? total + indi.product.disRate * indi.product.quantity
          : total + indi.product.mrp * indi.product.quantity;
      }, 0);

      setTotal(totalTemp);
    }
  }, [orderItems]);
  return (
    <div
      className="order-items d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: " 100vh" }}
    >
      <>
        {orderItems.length > 0 && !loading ? (
          <>
            <h1
              className="mt-5"
              style={{ textDecoration: "underline", marginBottom: "2rem" }}
            >
              Ordered Items
            </h1>
            <ul>
              {orderItems.map((item, index) => {
                return (
                  <li key={index} className="mb-5 mt-5">
                    <div className="name fs-3">Name: {item.product.name}</div>
                    <div className="rate fs-3">
                      Rate:{" "}
                      {item.user.promo.length > 0
                        ? item.product.disRate
                        : item.product.mrp}
                    </div>
                    <div className="quantity fs-3">
                      Quantity: {item.product.quantity}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="total fs-2 mb-5">
              Total({orderItems.length}): Rs {total}
            </div>
          </>
        ) : (
          <p className="fs-1">No Order Placed!</p>
        )}
      </>
      {loading && <Spinner />}
    </div>
  );
};
