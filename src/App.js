import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// pages
import SiteHeader from "./components/SiteHeader";
import Homepage from "./pages/Homepage";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import Footer from "./components/Footer";

// apollo
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache()
});

function App() {

  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
          <Footer />
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
