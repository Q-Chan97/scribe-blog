import "./App.css";

import { Outlet } from "react-router";

import Nav from "./components/Nav/Nav.tsx";

export default function App() {

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  )
}
