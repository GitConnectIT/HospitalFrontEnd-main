import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const baseRoutes: Array<IRoute> = [
  {
    path: "/",
    element: loadable(() => import("./pages/landingPage")),
  },
  {
    path: "/login",
    element: loadable(() => import("./pages/login")),
    private: true,
  },
  {
    path: "/register",
    element: loadable(() => import("./pages/registerPage")),
    private: true,
  },
  {
    path: "/resetpassword",
    element: loadable(() => import("./pages/setNewPassword")),
    private: true,
  },
  {
    path: "*",
    element: loadable(() => import("./pages/pageNotFound")),
  },
].map((x, id) => ({ id, ...x }));

export default baseRoutes;
