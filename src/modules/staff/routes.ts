import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const staffRoutes: Array<IRoute> = [
  {
    path: "/staff",
    element: loadable(() => import("./pages/staffPage")),
    private: true,
  },
  {
    path: "/staff/serviceTimes",
    element: loadable(() => import("./pages/ServiceHourPage")),
    private: true,
  },
  {
    path: "/staff/reservations",
    element: loadable(() => import("./pages/reservationPage")),
    private: true,
  },
  {
    path: "/staff/results",
    element: loadable(() => import("./pages/resultsPage")),
    private: true,
  },
].map((x, id) => ({ id, ...x }));

export default staffRoutes;
