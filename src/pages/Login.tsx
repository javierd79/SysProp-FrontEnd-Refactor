import React, { useState, useEffect } from "react";
import image from "../assets/images/image.png";
import axios from 'axios';
import { useHistory } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/');
    }
  }, [user]);

  const handleLogin = () => {
    axios.get(`https://sysprop-production.up.railway.app/usuarios?username=${username}&password=${password}`)
    .then(() => {
      localStorage.setItem('user', JSON.stringify({ username, password }));
      history.push('/');
    }).catch(() => {
      alert('Usuario o contraseña incorrectos');
    });
  }   

  return (
    <div className="login-container">
      <div className="form-body">
        <img src={image} alt="user-login" />
        <p className="text">Bienvenido a SysProp</p>

        <form className="login-form">
          <input
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Iniciar Sesión
          </button>
          <button type="button">Recuperar Contraseña</button>
        </form>
      </div>
    </div>
  );
}
