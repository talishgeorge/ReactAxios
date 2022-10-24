import Home from "./Home";
import About from "./About";
import Categories from "./Categories";
import Category from "./Category";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Employees from "./Employees";
import Employees2 from "./Employees2";
import BookingComponent from "./CreateBooking";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home title="Welcome to Red30 Tech" />} />
        <Route path="about" element={<BookingComponent />} />
        <Route path="categories" element={<Categories />}>
          <Route path=":catId" element={<Category />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="not-found">Page Not Found</h1>}
        />
      </Routes>

      <footer className="container">
        &copy;2022 | <a href="https://red30tech.com/">Red30 Tech</a>
      </footer>
    </div>
  );
}

export default App;
