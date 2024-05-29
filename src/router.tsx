import { createBrowserRouter } from "react-router-dom"
import App from "./app"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "hello",
        element: (
          <div className="w-full md:w-4/5 xl:w-3/5 mx-auto bg-amber-100 text-3xl p-8">
            Hello world
          </div>
        ),
      },
    ],
  },
])
