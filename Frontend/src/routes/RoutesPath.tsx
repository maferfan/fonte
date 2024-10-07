import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Template } from "../pages/Template/Template";
import { NotFound } from "../pages/NotFound/NotFound";
import { pathRoutes } from "../utils/path";

export const RoutesPath = () => {
  return (
    <BrowserRouter>
      <Routes>
        {pathRoutes.map((item) => (
            <Route element={<Template />} path={item.path} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
