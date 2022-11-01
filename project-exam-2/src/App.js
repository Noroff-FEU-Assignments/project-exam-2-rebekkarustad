import { Route, Routes } from "react-router-dom";
import "./sass/style.scss";

import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import DiscoverFeed from "./components/pages/DiscoverFeed";
import MyProfile from "./components/pages/MyProfile";
import PostPage from "./components/pages/PostPage";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<DiscoverFeed />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
