import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux"
import { persistor, store } from './Components/Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
 
import { ThemeProvider } from "@material-tailwind/react";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <PersistGate persistor={persistor}>

<Provider store={store}>

    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Provider>
    </PersistGate>
  </React.StrictMode>
);