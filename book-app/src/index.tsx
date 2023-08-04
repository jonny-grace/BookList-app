// import React from "react";
// import ReactDOM from "react-dom";

import { RecoilRoot } from "recoil";
// import App from "./App";
// import "./index.css";

// ReactDOM.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <App />
//     </RecoilRoot>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <App />
     </RecoilRoot>
  </React.StrictMode>
);