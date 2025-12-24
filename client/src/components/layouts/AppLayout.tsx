import { Outlet } from "react-router";
import AppNavbar from "./AppNavbar";
import { Toaster } from "react-hot-toast";

export default function AppLayout() {
  return (
    <>
      <AppNavbar />
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}
