import { Route, Routes } from "react-router-dom";
import "./sass/style.scss";

import Home from "./components/pages/login/Home";
import SignUp from "./components/pages/login/SignUp";
import Login from "./components/pages/login/Login";
import ThankYou from "./components/pages/login/ThankYou";
import DiscoverFeed from "./components/pages/feeds/DiscoverFeed";
import ProfileFeed from "./components/pages/feeds/ProfileFeed";
import MyProfile from "./components/pages/profiles/MyProfile";
import Profile from "./components/pages/profiles/Profile";
import EditProfile from "./components/pages/profiles/EditProfile";
import PostPage from "./components/pages/posts/PostPage";
import CreatePost from "./components/pages/posts/CreatePost";
import EditPost from "./components/pages/posts/EditPost";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/feed" element={<DiscoverFeed />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/profile" element={<ProfileFeed />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
