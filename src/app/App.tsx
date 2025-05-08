import { Outlet, useLocation } from "react-router-dom";
import { Component as AppHeader } from "@/features/header/header.page";
import { ROUTES } from "@/shared/model/routes";

export function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.REGISTER;

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <AppHeader />}
      <Outlet />
    </div>
  );
}
