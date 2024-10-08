import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BaseLayout from "./layouts/basiclayout";
import Home from "./pages/home";
import Error from "./pages/error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<Home />} />


      <Route path="*" element={<Error />} />
      
    </Route>)
 
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;