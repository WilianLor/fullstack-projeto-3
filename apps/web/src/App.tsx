import { ToastContainer } from "react-toastify";
import { SessionContextProvider } from "./contexts/SessionContext";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/global.theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SessionContextProvider>
        <ToastContainer position="bottom-center"/>
        <Router />
      </SessionContextProvider>
    </ThemeProvider>
  );
};

export default App;
