import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import MovieDetails from "./Components/MovieDetails";
import AddMovie from "./Components/AddMovie";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addmovie" element={<AddMovie/>} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
