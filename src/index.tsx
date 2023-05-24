import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App";
import initApp from "./main/initializers/app";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// initApp().then((appStore: any) => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <Provider store={appStore}>
//         <ToastContainer
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <App />
//       </Provider>
//     </React.StrictMode>,
//     document.getElementById("root")
//   );
// });

initApp().then((appStore: any) => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={appStore}>
      <Suspense fallback="loading">
        <App />
      </Suspense>
    </Provider>
  );
});

