import Post from "./components/post";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./components/login";
import Register from "./components/register";
import { UserContextProvider } from "./UserContext";
import Createpost from "./components/Createpost";
import DisplayPost from "./components/displayPost";
import Postpage from "./components/Postpage";
import EditPost from "./components/EditPost";
function App() {
  return (
    <div className="flex flex-col space-y-4">
      <UserContextProvider>
        <Routes>
          {/* common in every routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<DisplayPost />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route path="/Createpost" element={<Createpost />} />
            <Route path="/post/:id" element={<Postpage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
