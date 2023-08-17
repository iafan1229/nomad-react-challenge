import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv";
import "./index.css";
import SearchResult from "./pages/SearchResult";

const queryClient = new QueryClient();

/**
 * 라우터들이 존재함
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Movie />,
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <SearchResult />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ThemeProvider theme={{ color: "red" }}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
} else {
  console.error("Root element with ID 'root' not found.");
}
