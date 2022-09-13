import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getUserData();
  }, []);
  return (
    <div className="container vh-100">
      <div className="text-center mt-5">
        <div className="alert alert-info">
          {store.user && <div>{`Tu correo es: ${store.user.email}`}</div>}
        </div>
      </div>
    </div>
  );
};
