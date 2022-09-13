import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState(null);
  const [emailError, setemailError] = useState(null);

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setemailError("Datos vacíos en el email!");
      return false;
    }

    if (!password.trim()) {
      setpasswordError("Datos vacíos en el password!");
      return false;
    }
    if (password.length < 6) {
      setpasswordError("El password debe contener 6 o más carácteres.");
      return false;
    }
    setemailError(null);
    setpasswordError(null);
    let data = {
      email: email,
      password: password,
    };
    if (await actions.login(data)) {
      navigate("/");
    } else {
      alert("No pudiste acceder, verificas tus datos");
    }
  };
  return (
    <div className="container vh-100">
      <form className="row justify-content-center">
        <div className="col-md-5">
          <>
            <div className="form-group mt-3">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Introduce el correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="text-danger form-text">{emailError}</small>
            </div>
            <div className="form-group mt-3">
              <label>Clave</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Introduce la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small id="passworderror" className="text-danger form-text">
                {passwordError}
              </small>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-dark" onClick={handleClick}>
                Ingresar
              </button>
            </div>
          </>
        </div>
      </form>

      <hr className="my-4" />
      <Link to="/">
        <span className="btn btn-dark btn-lg" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
};
