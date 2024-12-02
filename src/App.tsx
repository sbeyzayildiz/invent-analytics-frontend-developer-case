import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Movie } from "./components/Movie";
import { NuqsAdapter } from "nuqs/adapters/react-router";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/movies/:id", element: <Movie /> },
]);
export const App = () => {
  return (
    <NuqsAdapter>
      <RouterProvider router={router}></RouterProvider>
    </NuqsAdapter>
  );
};
