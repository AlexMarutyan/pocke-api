import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { CardView, TableView } from "./components/MainRoutes";
import RootLayout from "./layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<TableView />} />
        <Route path="/cards" element={<CardView />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
