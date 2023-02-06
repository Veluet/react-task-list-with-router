import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page";

import Root from "./routes/root";

import About from "./routes/about";

import Index from "./routes/index";

import Tasks, {
  loader as tasksLoader,
  action as tasksAction,
} from "./routes/tasks";

import CompletedTasks, {
  loader as completedTasksLoader,
} from "./routes/completed-tasks";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "tasks",
            element: <Tasks />,
            loader: tasksLoader,
            action: tasksAction,

          },
          {
            path: "completed-tasks",
            element: <CompletedTasks />,
            loader: completedTasksLoader,

          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);