import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./components/CartProduct";
import { toast } from "./components/Toast";
import "./styles/Profile.css";
import { API_URL } from "./variables";
import "./components/styles/CssUtils.css";

const Profile = (props) => {
  const [state, setState] = useState({
    name: "",
    cart: [],
  });

  const [total, setTotal] = useState(0);
  const [checkoutProductsList, setcheckoutProductsList] = useState([]);

  const userId = props.userId;
  const goTo = useNavigate();

  const loadUser = () => {
    axios.get(API_URL + "/user/" + userId).then((resp) => {
      const dbUser = resp.data;
      setState({
        name: dbUser.name,
        cart: dbUser.cart,
      });
    });
  };

  const checkoutProducts = () =>{
    axios
      .post(API_URL + "/user/" + userId + "/cart/checkout", { productsList: checkoutProductsList})
      .then((resp) => {
        if(resp.status==200){
          const checkboxes = Object.values(document.getElementsByClassName('cart-product-checkbox'));
          checkboxes.forEach(element => {
            element.checked=false;
          });
          setcheckoutProductsList([]);
          props.setAppCheckout(total);
          toast('Pagamento pendente...');
          loadUser();
        }
      });

  }

  const removeProduct = (index) => {
    document.getElementById(index.toString()).classList.add("fadeout");
    axios
      .post(API_URL + "/user/" + userId + "/cart/remove", { index })
      .then((resp) => {
        toast("Item removido do carrinho");
        setTimeout(() => {
          loadUser();
          document.getElementById(index.toString()).classList.remove("fadeout");
        }, 500);
      });
  };

  const goToCatalogue = () => {
    goTo("/");
  };

  const logout = () => {
    props.unvalidate({
      userId: "",
      logged: false,
    });
    localStorage.setItem("userId", "");
    goTo("/");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="profile-root">
      <div className="profile-container">
        <i
          onClick={goToCatalogue}
          className="clickable corner-buttons profile-back-button fa-solid fa-arrow-left"
        ></i>

        <i
          onClick={logout}
          className="clickable corner-buttons profile-logout-button fa-solid fa-arrow-right-from-bracket"
        ></i>

        <i className="clickable profile-pic fa-solid fa-circle-user"></i>
        <span>{state.name}</span>

        <div className="profile-cart-container">
          <i className="fa-solid fa-cart-shopping">
            {"  " + state.cart.length}
          </i>
          <div className="profile-user-cart">
            {state.cart.map((product, index) => {
              return (
                <CartProduct
                  id={product.id}
                  key={index}
                  index={index}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  total={product.total}
                  onRemove={removeProduct}
                  checkout={total}
                  setTotal={setTotal}
                  setcheckoutProductsList={setcheckoutProductsList}
                  checkoutProductsList={checkoutProductsList}
                />
              );
            })}
          </div>
        </div>

        <button onClick={checkoutProducts} className="profile-checkout-button">
          CONFIRMAR - ${total},00
        </button>
      </div>
    </div>
  );
};

export default Profile;
