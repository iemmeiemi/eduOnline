import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/Routers.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

// TanStack Query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={routers} />
    </QueryClientProvider>
  </AuthProvider>
);