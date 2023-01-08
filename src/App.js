import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Header from "./components/Header";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "movies/:slug",
    element: <Movies />,
  },
]);

function App() {
  return (
    <div>
      <Header/>
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;
