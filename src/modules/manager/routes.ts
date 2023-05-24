import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const managerRoutes: Array<IRoute> = [
  {
    path: "/manager",
    element: loadable(() => import("./pages/managerPage")),
    private: true,
  },
  {
    path: "/manager/services",
    element: loadable(() => import("./pages/servicesPage")),
    private: true,
  },
  {
    path: "/manager/devices",
    element: loadable(() => import("./pages/devicesPage")),
    private: true,
  },
  {
    path: "/manager/workers",
    element: loadable(() => import("./pages/workersPage")),
    private: true,
  },
  {
    path: "/manager/reports",
    element: loadable(() => import("./pages/reportsPage")),
    private: true,
  },
  {
    path: "/manager/delays",
    element: loadable(() => import("./pages/delaysPage")),
    private: true,
  },
].map((x, id) => ({ id, ...x }));

export default managerRoutes;
