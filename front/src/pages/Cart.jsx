import Nav from "../UI/Nav";
import { OrderedItems } from "../UI/OrderedItems";
import Footer from "../UI/Footer";

function Cart({ baseURL }) {
  return (
    <section className="cart">
      <Nav />
      <OrderedItems baseURL={baseURL} />
      <Footer />
    </section>
  );
}

export default Cart;
