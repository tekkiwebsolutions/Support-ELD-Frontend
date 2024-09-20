import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import ThemeProvider from "./themes/Index/Index.jsx";
import { store } from "./Redux/Store/index.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// axios.defaults.baseURL = apiUrl;

// const persistedStateString = localStorage.getItem("persist:root");

// // Parse the persisted state JSON string to an object
// const persistedState = JSON.parse(persistedStateString);

// // Access the auth slice from the persisted state
// const authState = JSON.parse(persistedState?.auth);

// // Retrieve the token from the auth slice
// const accessToken = authState?.token;
// axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ThemeProvider>
          <ToastContainer
           closeButton
           position="top-left"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           pauseOnHover
           theme="colored"
          
          
          />
          <App />
      </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
