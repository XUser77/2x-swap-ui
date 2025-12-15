import { Outlet } from "react-router";
import HomeNavbar from "./HomeNavbar";

export default function HomeLayout() {
  return (
    <>
      <HomeNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
