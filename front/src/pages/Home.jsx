import { useContext, useEffect } from "react";
import Nav from "../UI/Nav";
import Items from "../UI/Items";
import Footer from "../UI/Footer";
import Login from "./Login";
import { LoginContext } from "../App";
import axios from "axios";

function Home({ baseURL }) {
  const { login, setLogin } = useContext(LoginContext);
  useEffect(() => {
    axios
      .get(baseURL + "activate")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Failed to load server");
      });
  }, []);
  return login?.name.length < 1 ? (
    <Login login={login} setLogin={setLogin} />
  ) : (
    <>
      <Nav />
      <section className="home fade-in">
        <div className="content text-center">
          <header>
            <h1>Welcome To Bashyal Dairy</h1>
          </header>
          <p className="fs-5">
            We offer Fresh Nauni And Paneer On Discounted Price With Promo Code.
            Have A Test And Be With Best! (Bashyal Dairy) . The Best Dairy In
            Tilottama.
          </p>
        </div>
        <Items baseURL={baseURL} />
      </section>
      <Footer />
    </>
  );
}

export default Home;
