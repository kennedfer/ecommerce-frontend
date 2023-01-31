import axios from "axios";
import { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogue from "./Catalogue";
import Login from "./Login";
import Profile from "./Profile";
import { API_URL } from "./variables";

const App = () => {
  const userId = localStorage.getItem("userId");

  const [state, setState] = useState({
    userId,
    logged: "",
  });

  const[checkoutTotal, setCheckoutTotal] = useState(0);

  let logged = true;

  useEffect(() => {
    const getLogged = async () => {
      let resp = await axios.get(API_URL + "/user/" + userId + "/logged");
      setState({
        userId,
        logged: resp.data.logged,
      });
    };

    getLogged();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profile"
          element={
            !state.logged || state.userId === "" ? (
              <Login validate={setState} />
            ) : (
              <Profile setAppCheckout={setCheckoutTotal} unvalidate={setState} userId={userId} />
            )
          }
        />
        <Route
          path="/"
          element={<Catalogue logged={state.logged} userId={userId} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
