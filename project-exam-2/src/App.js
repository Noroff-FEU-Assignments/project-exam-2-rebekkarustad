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
import EditProfile from "./components/pages/EditProfile";
import ThankYou from "./components/pages/ThankYou";
import EditPost from "./components/pages/EditPost";

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
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/editpost/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
