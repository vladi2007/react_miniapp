import { createBrowserRouter } from "react-router";
import App from "./src/App";
import Main from "./src/components/main_menu";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
        {path:"main", Component:Main}
    ]
  },
]);
