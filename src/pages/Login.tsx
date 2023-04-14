import { useState, useEffect } from "react";
import image from "../assets/images/image.png";
import axios from 'axios';
import { Notification } from "@mantine/core";
import { useHistory } from "react-router-dom";
import "../assets/css/login.css"

type Props = {};

export default function Login({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState('');
  
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/');
    }
  }, []);

  const handleLogin = () => {
    axios.post(`https://sysprop-production.up.railway.app/usuarios/login`, {
      username,
      password
    })
    .then(() => {
      localStorage.setItem('user', JSON.stringify({ username, password }));
      history.push('/');
      setError('')
    }).catch((err) => {
      setNotification(true);
      setError(err.response.data.message);
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    });
  }   

  return (
    <>
    {
      notification && (
        <div className="notification">
          <Notification color="red" title="Error al intentar loguearse">
            {error}
          </Notification>
        </div>
      )
    }
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
    </>
  );
}
