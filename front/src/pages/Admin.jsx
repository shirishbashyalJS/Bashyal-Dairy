import axios from "axios";
import { useEffect, useState } from "react";
import { Success } from "../UI/Success";
import { Spinner } from "../UI/Spinner";

export const Admin = ({ baseURL }) => {
  const [order, setOrder] = useState([]);
  const [detail, setDetail] = useState({});
  const [ordersDetail, setOrdersDetail] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAdminData = (e) => {
    const { name, value } = e.target;
    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const handleOrderAmount = (data) => {
    const list = ["Nauni", "Paneer"];
    list.map((item) => {
      const unit = data.reduce((total, prod) => {
        return prod.product.name === item
          ? prod.product.quantity + total
          : 0 + total;
      }, 0);
      setOrdersDetail((prev) => ({ ...prev, [item]: unit }));
    });
    const totalAmount = data.reduce((total, prod) => {
      return prod.user.promo.length > 0
        ? total + prod.product.quantity * prod.product.disRate
        : total + prod.product.quantity * prod.product.mrp;
    }, 0);
    setOrdersDetail((prev) => ({ ...prev, ["totalAmount"]: totalAmount }));
  };

  const handleSubmit = () => {
    setLoading(true);
    axios
      .get(`${baseURL}admin`, { headers: detail })
      .then((res) => {
        setOrder(
          res.data.sort((a, b) => a.user.name.localeCompare(b.user.name))
        );
        setLoading(false);
        handleOrderAmount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComplete = (item) => {
    const confirm = parseInt(prompt("Enter the amount of order"));
    const orderAmt =
      item.user.promo.length > 0
        ? item.product.quantity * item.product.disRate
        : item.product.quantity * item.product.mrp;
    if (confirm == orderAmt)
      axios
        .delete(`${baseURL}order/delete/${item._id}`)
        .then((res) => {
          setSuccess(true);
          console.log(res.data);
          setOrder((prev) =>
            prev.filter((prod) => {
              return prod._id != item._id;
            })
          );
        })
        .catch((err) => {
          alert("error");
        });
    else {
      alert("Worng Order Amount");
    }
  };
  return (
    <section className="admin-page">
      {success && (
        <Success
          setSuccess={setSuccess}
          success={success}
          message={"Completed"}
        />
      )}
      {order.length < 1 ? (
        <div
          className="test d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100%", overflow: "hidden" }}
        >
          <>
            {!loading ? (
              <form action="" className="d-flex flex-column gap-2">
                <input
                  type="text"
                  name="username"
                  onChange={(e) => handleAdminData(e)}
                  className="username fs-2 p-2"
                  placeholder="Username"
                  style={{
                    width: "200px",
                  }}
                />
                <input
                  type="password"
                  name="password"
                  className="password fs-2 p-2"
                  onChange={(e) => handleAdminData(e)}
                  placeholder="Password"
                  style={{
                    width: "200px",
                  }}
                />
                <input
                  type="button"
                  className="fs-2"
                  value="Check"
                  onClick={handleSubmit}
                />
              </form>
            ) : (
              <Spinner />
            )}
          </>
        </div>
      ) : (
        <div className="admin">
          <h1 className="text-center">Admin Page</h1>
          {Object.keys(ordersDetail).length > 0 && (
            <div className="details fs-1 text-center">
              <p>Total Nauni Order: {ordersDetail.Nauni}</p>
              <p>Total Paneer Order: {ordersDetail.Paneer}</p>
              <p>Total Order Amount: {ordersDetail.totalAmount}</p>
            </div>
          )}
          <div className="orders">
            {order.map((item, index) => {
              const { user, product } = item;
              return (
                <div
                  className="order mb-5 text-center pt-5 pb-5"
                  key={index}
                  style={{
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <div className="userdetail fs-1">
                    <h1>User Detail</h1>
                    <p className="name">Name : {user.name}</p>
                    <p className="contact">Contact : {user.contact}</p>
                    <p className="promo">Promo : {user.promo}</p>
                    <p className="latitude">Latitude : {user.latitude}</p>
                    <p className="longitude">Longitude : {user.longitude}</p>
                    <button
                      className="fs-2"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps?q=+++${user.latitude}++++${user.longitude}`
                        );
                      }}
                      style={{
                        border: "none",
                        backgroundColor: "lightgray",
                        padding: ".5rem 2rem .5rem 2rem",
                        borderRadius: "1rem",
                      }}
                    >
                      Open User Location
                    </button>
                  </div>
                  <div className="orderItems mt-5 fs-1">
                    <h1>Product Detail</h1>
                    <p>Item: {product.name}</p>
                    <p>
                      Rate:{" "}
                      {user.promo.length > 0 ? product.disRate : product.mrp}
                    </p>
                    <p>Qunatity: {product.quantity}</p>
                    <p>
                      Total Amount:{" "}
                      {user.promo.length > 0
                        ? product.quantity * product.disRate
                        : product.quantity * product.mrp}
                    </p>
                  </div>
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={() => handleComplete(item)}
                  >
                    Completed
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
