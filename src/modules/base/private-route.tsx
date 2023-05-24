import React from "react";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import useGetUser from '../../main/hooks/useGetUser'
const PrivateRoute: FC<any> = (props: any) => {
  const { children } = props;
  const user = useGetUser();
  return user ? <Navigate to={`/${user.role}`} /> : children;
};

export default PrivateRoute;
