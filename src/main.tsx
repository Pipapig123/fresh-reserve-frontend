import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import './index.css'
import App from './App.tsx'
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/user",
    element: <App/>,
  },
  {
    path: "/merchant",
    element: <App/>,
  },
  {
    path: "/admin",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
