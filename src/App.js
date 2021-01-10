import React, { Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import FourOFour from "./pages/FourOFour";

const LoadingFallback = () => {
  <div>Loading...</div>;
};

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/login">
      <Signup />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const PremiumRoute = ({ children, ...rest }) => {
  const { authState } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authState.isAuthenticated ? <>{children}</> : <Redirect to="/" />
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <PremiumRoute path="/dashboard">
            <Dashboard />
          </PremiumRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <AppRoutes />
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}
