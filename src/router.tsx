import { createBrowserRouter } from "react-router-dom"
import App from "./app"
import HelloWorld from "./routes/hello-world"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "hello",
        element: <HelloWorld />,
      },
    ],
  },
])
