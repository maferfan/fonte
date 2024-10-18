import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "../pages/Template/Template";
import { NotFound } from "../pages/NotFound/NotFound";
import { pathRoutes } from "../utils/path";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const RoutesPath = () => {
  return (
    <BrowserRouter>
      <Routes>
        {pathRoutes.map((item, idx) => (
            <Route key={ idx} element={<Template />} path={item.path} />
        ))}
        <Route path="*" element={<NotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
