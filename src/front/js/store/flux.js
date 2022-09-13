const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: null,
      user: null,
      demo: [
        {
          title: "Login",
          ruta: "/login",
          background: "white",
          initial: "white",
        },
        {
          title: "Signup",
          ruta: "/signup",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      getUserData: async () => {
        const token = localStorage.getItem("token");
        const store = getStore();

        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/user-data`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (resp.ok) {
            const data = await resp.json();
            setStore({ user: data.user });
          }
        } catch (error) {
          console.log("Hubo un error al consultar al login");
        }
      },
      login: async (data) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (resp.ok) {
            const data = await resp.json();
            localStorage.setItem("token", data.access_token);
            setStore({ token: data.access_token });

            return true;
          } else if (resp.status === 401) {
            alert("Los datos no coinciden");
            return false;
          }
          return false;
        } catch (error) {
          console.log("Hubo un error al ingresar al login");
        }
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null });
        setStore({ user: null });
      },
      registro: async (data) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/registro`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (resp.status !== 200) {
            alert("No se pudo registrar el usuario");
            return false;
          }
          if (resp.ok) {
            alert("Usuario registrado");
            return true;
          }
          return false;
        } catch (error) {
          console.log("Hubo un error al ingresar al login");
        }
      },
      getMessage: async () => {
        const baseurl = process.env.BACKEND_URL + "/api/hello";

        try {
          // fetching data from the backend
          const store = getStore();
          const opts = {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          };
          //const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
          const resp = await fetch(baseurl, opts);
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
