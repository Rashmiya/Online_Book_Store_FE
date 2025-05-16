import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignInView from "../pages/OnBoarding/Sign in/SignInView";
import DashboardLayout from "../pages/Layout/DashboardLayout";
import SignUpView from "../pages/OnBoarding/Sign up/SignUpView";
import OnBoardingProcess from "../pages/OnBoarding/OnBoardingProcess";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookView from "../pages/BookView/BookView";
import HelpCenter from "../pages/LandingPages/HelpCenter";
import BookCheckout from "../pages/BookCheckout/BookCheckout";
import AboutUs from "../pages/LandingPages/AboutUs";
import PrivacyPolicy from "../pages/LandingPages/PrivacyPolicy";
import Contact from "../pages/LandingPages/Contact";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyProfile from "../pages/MyProfile/MyProfile";

const Routerset = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {/* -----------------------------basic routes----------------------------- */}
      <Route path="onboarding/*" element={<OnBoardingProcess />}>
        <Route path="" element={<SignInView />} />
        <Route path="sign-in" element={<SignInView />} />
        <Route path="sign-in/:id" element={<SignInView />} />
        <Route path="sign-up" element={<SignUpView />} />
        <Route path="sign-up/:id" element={<SignUpView />} />
      </Route>

      {/* -----------------------------private & public routes----------------------------- */}
      {true ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="view-book/:id" element={<BookView />} />
          <Route path="help" element={<HelpCenter />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="privacypolicy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="checkout-book/:id"
            element={<PrivateRoute element={<BookCheckout />} />}
          />
          <Route
            path="order-success/:id"
            element={<PrivateRoute element={<OrderSuccess />} />}
          />

          <Route
            path="my-profile"
            element={<PrivateRoute element={<MyProfile />} />}
          />
        </Route>
      ) : (
        <Route path="*" element={<SignInView />} />
      )}
    </Routes>
  );
};

export default Routerset;

const PrivateRoute = ({ element }) => {
  const { isAuthChack } = useContext(AuthContext);

  if (isAuthChack) {
    return element;
  } else {
    return <Navigate to="/onboarding/sign-in" replace />;
  }
};
