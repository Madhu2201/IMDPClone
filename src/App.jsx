import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import MovieDetails from "./Components/MovieDetails";
import AddMovie from "./Components/AddMovie";
import UpdateAndDelete from "./Components/UpdateAndDelete";
import SignupPage from "./Components/SignupPage";
import ResetPassword from "./Components/ResetPassword";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/resetpassword" element={<ResetPassword/>} />
            <Route path="/addmovie" element={<AddMovie/>} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/update/:id" element={<UpdateAndDelete/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
