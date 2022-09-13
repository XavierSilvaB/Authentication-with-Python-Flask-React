import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Kimberling</span>
        </Link>
        <div className="ml-auto">
          {"  "}
          {store.token == null ? (
            <>
              <Link to="/login">
                <button className="btn btn-dark">Login</button>
              </Link>{" "}
              <Link to="/signup">
                <button className="btn btn-dark">Register</button>
              </Link>
            </>
          ) : (
            <button onClick={() => actions.logout()} className="btn btn-dark">
              Cerrar Sesión
            </button>
          )}{" "}
        </div>
      </div>
    </nav>
  );
};
