import React from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import eRoleType from "../../main/assets/enums/eRoleType";
import useGetUser from "../../main/hooks/useGetUser";

const PrivateRoute: FC<any> = (props: any) => {
  const { children } = props;
  const user = useGetUser();
  if (user && user.role !== eRoleType.Recepsionist) {
    return <Navigate to={`/${user.role}`} />;
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
