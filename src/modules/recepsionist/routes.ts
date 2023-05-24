import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const recepsionistRoutes: Array<IRoute> = [
  {
    path: "/recepsionist",
    element: loadable(() => import("./pages/recepsionistDashboard")),
    private: true,
  },
  {
    path: "/recepsionist/reservations",
    element: loadable(() => import("./pages/reservationsPage")),
    private: true,
  },
  {
    path: "/recepsionist/reservations/:id",
    element: loadable(() => import("./pages/reservationDetails")),
    private: true,
  },
  {
    path: "/recepsionist/availableTimes",
    element: loadable(() => import("./pages/workingHourServicePage")),
    private: true,
  },
  {
    path: "/recepsionist/publishTime",
    element: loadable(() => import("./pages/publishTime")),
    private: true,
  },
  {
    path: "/recepsionist/postponedReservations",
    element: loadable(() => import("./pages/postponedReservations")),
    private: true,
  },
].map((x, id) => ({ id, ...x }));

export default recepsionistRoutes;
