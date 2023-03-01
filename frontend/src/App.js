import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin, Home } from "./containers/imports";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
