import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "./hooks/useSession";

import CreateDomain from "./pages/CreateDomain/index";
import Home from "./pages/Home/index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ListUserDomains from "./pages/ListUserDomains/index";

const Router = () => {
  const { isLogged } = useSession();

  if (isLogged === undefined) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route index element={isLogged ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="create-domain"
          element={isLogged ? <CreateDomain /> : <Navigate to="/login" />}
        />
        <Route
          path="list-user-domains"
          element={isLogged ? <ListUserDomains /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
