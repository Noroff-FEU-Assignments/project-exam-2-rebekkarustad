import { Route, Routes } from "react-router-dom";
import "./sass/style.scss";

import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import DiscoverFeed from "./components/pages/DiscoverFeed";
import MyProfile from "./components/pages/MyProfile";
import PostPage from "./components/pages/PostPage";
import Profile from "./components/pages/Profile";
import ProfileFeed from "./components/pages/ProfileFeed";
import CreatePost from "./components/pages/CreatePost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<DiscoverFeed />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile" element={<ProfileFeed />} />
        <Route path="/profile/:name" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
