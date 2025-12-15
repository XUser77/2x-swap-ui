import { Outlet } from "react-router";
import AppNavbar from "./AppNavbar";

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
