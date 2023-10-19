import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import Contact from "./pages/Contact";
import More from "./pages/More";
import Product from "./pages/Product";
import FileManager from "./pages/FileManager";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#111] text-white min-h-[100vh] ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/more" element={<More />}>
            <Route path="file-manager" element={<FileManager />} />
            <Route path="todo" />
            <Route path="progress-bar" />
          </Route>
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
