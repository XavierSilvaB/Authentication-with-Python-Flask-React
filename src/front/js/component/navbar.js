import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className=" barra navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="title1 ">4Geeks Academy</span>
        </Link>
        <div className="ml-auto">
          {"  "}
          {store.token == null ? (
            <>
              <Link to="/login">
                <button className="button-loggin btn btn-secondary">
                  Login
                </button>
              </Link>{" "}
              <Link to="/signup">
                <button className="button-loggin btn btn-secondary">
                  Register
                </button>
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
