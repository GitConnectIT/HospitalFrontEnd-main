import PrivateRoute from "./private-route";
import { Route } from "react-router-dom";
import routes from "./routes";

const UserModule = () => {
  return routes.map((route) => {
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
  });
};

export default UserModule;
