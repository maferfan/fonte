import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MovieProvider } from "./context/movies";
import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
  </AuthProvider>
);

reportWebVitals();
