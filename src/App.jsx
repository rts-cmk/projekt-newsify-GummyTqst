import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Layout from "./components/Layout/Layout"
import Archive from "./pages/Archive"
import Popular from "./pages/Popular"
import Settings from "./pages/Settings"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/archive", element: <Archive /> },
      { path: "/popular", element: <Popular /> },
      { path: "/settings", element: <Settings />},
    ],
  },
])

function App() {

  return <RouterProvider router={router} />
}

export default App
