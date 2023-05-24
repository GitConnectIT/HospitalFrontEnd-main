import { FC } from "react";
import { Navigate } from "react-router-dom";
import useGetUser from "../../main/hooks/useGetUser";
import eRoleType from "../../main/assets/enums/eRoleType";
import React from "react";

const PrivateRoute: FC<any> = (props: any) => {
  const { children } = props;
  const user = useGetUser();
  if (user && user.role !== eRoleType.Staff) {
    return <Navigate to={`/${user.role.toLowerCase()}`} />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
