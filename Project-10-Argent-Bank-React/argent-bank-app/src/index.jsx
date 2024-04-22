// import React from "react";
// import ReactDOM from "react-dom/client";
// import Router from "./routes/Router.jsx";
// import "./sass/index.scss";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Router />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Router from "./routes/Router.jsx";
import "./sass/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      {/* Fournir le store à votre application */}
      <Router />
    </Provider>
  </React.StrictMode>
);
