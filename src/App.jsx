import "./App.css";
import { RouterProvider } from "react-router-dom";


import router from "../src/Routes/Router"
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
