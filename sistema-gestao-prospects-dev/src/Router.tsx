import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
  );
}
