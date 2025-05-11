import React, { createContext, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { getLocalStoragedata } from "../pages/helpers/StorageHelper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getLocalStoragedata("userDetails"));
  const [token, setToken] = useState(getLocalStoragedata("token"));
  const [userPermissionList, setUserPermissionList] = useState(
    getLocalStoragedata("userPermissionList"),
  );
  const [timeZone, setTimeZone] = useState();
  const [isAuthChack, setIsAuthChack] = useState(
    getLocalStoragedata("authCheck"),
  );
  const [profilePicture, setProfilePicture] = useState(
    getLocalStoragedata("profilePic"),
  );
  const isExpired = getLocalStoragedata("user")?.isSubscriptionExpired || false;
  const expireDate = getLocalStoragedata("user")?.subscriptionDueDate || null;

  let block = false;

  if (expireDate) {
    const date1 = dayjs(new Date());
    const dif = date1.diff(dayjs(expireDate), "day");
    block = dif > 7 ? true : false;
  }

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userPermissionList,
      setUserPermissionList,
      user,
      setUser,
      timeZone,
      setTimeZone,
      isExpired,
      block,
      profilePicture,
      setProfilePicture,
      isAuthChack,
      setIsAuthChack,
    }),
    [
      token,
      userPermissionList,
      user,
      timeZone,
      isExpired,
      block,
      profilePicture,
      isAuthChack,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
