import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SiteHeader from "./components/SiteHeader";
import Homepage from "./pages/Homepage";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";

function App() {
  return (
    <Router>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
