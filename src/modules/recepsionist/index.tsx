import PrivateRoute from "./private-route";
import { Route } from "react-router-dom";
import routes from "./routes";
import FullLayout from "../../main/components/Layouts";
import React from "react";

const RecepsionistModule = () => {
  return (
    <Route
      key="recepsionist-main-route"
      path="recepsionist"
      element={<FullLayout />}
    >
      {routes.map((route) => {
        const Element = route.element;

        return (
          <Route
            key={`${route.path}_key`}
            element={
              route.private ? (
                <PrivateRoute>{<Element />}</PrivateRoute>
              ) : (
                <Element />
              )
            }
            path={route.path}
          />
        );
      })}
    </Route>
  );
};

export default RecepsionistModule;
