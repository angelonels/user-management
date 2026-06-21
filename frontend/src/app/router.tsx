import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/layout/app-shell";
import { CreateUserPage } from "../features/users/pages/create-user-page";
import { EditUserPage } from "../features/users/pages/edit-user-page";
import { UserDetailsPage } from "../features/users/pages/user-details-page";
import { UsersListPage } from "../features/users/pages/users-list-page";
import { NotFoundPage } from "./not-found-page";
import { RouteToast } from "./route-toast";

export function createAppRouter(isDark: boolean, onToggleTheme: () => void) {
  return createBrowserRouter([
    {
      element: (
        <>
          <AppShell isDark={isDark} onToggleTheme={onToggleTheme} />
          <RouteToast />
        </>
      ),
      children: [
        { path: "/", element: <Navigate to="/users" replace /> },
        { path: "/users", element: <UsersListPage /> },
        { path: "/users/new", element: <CreateUserPage /> },
        { path: "/users/:id", element: <UserDetailsPage /> },
        { path: "/users/:id/edit", element: <EditUserPage /> },
        { path: "*", element: <NotFoundPage /> }
      ]
    }
  ]);
}
