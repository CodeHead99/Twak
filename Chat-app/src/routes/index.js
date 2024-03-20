import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        { path: "verify", element: <VerifyPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "group", element: <GroupPage /> },
        { path: "settings", element: <Settings /> },
        // { path: "conversation", element: <Conversation /> },
        // { path: "chats", element: <Chats /> },
        // { path: "contact", element: <Contact /> },
        { path: "profile", element: <ProfilePage /> },

        { path: "call", element: <CallPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const ProfilePage = Loadable(lazy(() => import("../pages/dashboard/Profile")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
