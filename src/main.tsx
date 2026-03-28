import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { getThemeCssVars } from "./styles/themes.ts";

// Apply theme CSS variables to :root before render
const cssVars = getThemeCssVars();
const root = document.documentElement;
Object.entries(cssVars).forEach(([key, value]) => {
  root.style.setProperty(key, value);
});

createRoot(document.getElementById("root")!).render(<App />);
