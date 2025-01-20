import { useEffect, useState } from "react";

function Login({ login, setLogin }) {
  const [tempLog, setTempLog] = useState({ ...login });
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setTempLog({
          ...tempLog,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTempLog({ ...tempLog, [name]: value });
  };
  const handleSubmit = () => {
    if (
      tempLog.name.length > 2 &&
      tempLog.contact.length === 10 &&
      tempLog.latitude > 0
    ) {
      setLogin(tempLog);
      localStorage.setItem("login", JSON.stringify(tempLog));
    }
    if (tempLog.contact.length !== 10) alert("Contact must be of 10 digit!");
    if (tempLog.name.length < 2) alert("Name is necessary!");
    if (tempLog.latitude === 0) alert("Location is necessary!");
  };

  return (
    <section className={login.name.length > 0 ? "login fade-out" : "login"}>
      <h1 className="login-title mb-5">Welcome To Bashyal Dairy!</h1>
      <form action="" className="d-flex flex-column gap-3">
        <div className="name">
          <input
            type="text"
            placeholder="Name"
            className="input"
            id="name"
            name="name"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="contact">
          <input
            type="number"
            placeholder="Contact"
            className="input"
            id="number"
            name="contact"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="location">
          <input
            className="input"
            type="button"
            value={tempLog.latitude > 0 ? "Thank You" : "Provide Location"}
            onClick={handleLocation}
          />
        </div>
        <div className="Promo">
          <input
            className="input"
            type="text"
            name="promo"
            placeholder="Promo(additinal)"
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="submit mt-5">
          <button
            type="submit"
            className="input"
            style={{ backgroundColor: "white", color: "orangered" }}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Let's Start!
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
