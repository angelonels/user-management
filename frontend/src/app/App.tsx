import { useEffect, useMemo, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { createAppRouter } from "./router";

function getInitialTheme() {
  const saved = window.localStorage.getItem("user-management-system-theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function App() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("user-management-system-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const router = useMemo(
    () => createAppRouter(isDark, () => setIsDark((value) => !value)),
    [isDark]
  );

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
