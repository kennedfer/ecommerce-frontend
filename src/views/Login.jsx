import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { toast } from "./components/Toast";
import ToggleButton from "./components/ToggleButton";
import "./styles/Login.css";
import { API_URL } from "./variables.js";

const Login = (props) => {
  const navigateTo = useNavigate();
  const userId = localStorage.getItem("userId", "");

  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
    repeated_password: "",
    login: true,
  });

  const login = () => {
    const bodyUser = {
      email: state.email,
      password: state.password,
    };

    axios.post(API_URL + "/user/login", bodyUser).then((res) => {
      if (!res.data.wrong) {
        toast("Logado com sucesso");

        localStorage.setItem("userId", res.data.id);

        props.validate({
          userId: res.data.id,
          logged: true,
        });

        navigateTo("/");
        return;
      }

      toast("Senha incorreta");
    });
  };

  const validateEmail = () => {
    const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return state.email.match(validator);
  };

  const validatePassword = () => {
    return state.password.length >= 7;
  };

  const register = () => {
    if (!validateEmail()) return toast("Email inválido");
    if (state.password != state.repeated_password)
      return toast("Senhas diferentes");
    if (!validatePassword()) return toast("Senha muito curta");

    const bodyUser = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    axios.post(API_URL + "/user/signup", bodyUser).then((res) => {
      if (res.status == 200) {
        if (res.data.emailUsed) return toast("Email já está sendo usado");

        toast("Registrado com sucesso");

        localStorage.setItem("userId", res.id);
        // navigateTo("/profile");
        window.location.reload();
      }
    });
  };

  const submit = () => {
    if (state.login) return login();
    register();
  };

  const changeMode = (login) => {
    setState({
      ...state,
      login,
    });
  };

  const handleInputs = (input, value) => {
    let newState = { ...state };
    newState[input] = value;
    setState(newState);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-title">{state.login ? "LOGIN" : "REGISTRAR"}</div>
        {!state.login && (
          <Input
            ph="e.g.Jorge Kenned Ferreira dos Santos"
            label="Nome:"
            type="text"
            handler={handleInputs}
            property="name"
          />
        )}

        <Input
          ph="example@example.com"
          label="Email:"
          type="text"
          handler={handleInputs}
          property="email"
        />

        <Input
          ph=""
          label="Senha:"
          type="password"
          handler={handleInputs}
          property="password"
        />

        {!state.login && (
          <Input
            ph=""
            label="Repita Senha:"
            type="password"
            handler={handleInputs}
            property="repeated_password"
          />
        )}

        <ToggleButton login={state.login} onClick={changeMode} />

        <button onClick={submit} className="login-enter-button">
          ENTRAR
        </button>
      </div>
    </div>
  );
};

export default Login;
