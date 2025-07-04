import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./assets/pages/Home";
import Art from "./assets/pages/Art";
import ArtView from "./assets/pages/ArtView";
import ArtTags from "./assets/pages/ArtTags";
import Music from "./assets/pages/Music";
import MusicView from "./assets/pages/MusicView";
import Docs from "./assets/pages/Docs";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

// NOTE:
// If you replace HashRouter with another system, change the links else where
// Like the link from /art to /art/tags, because that's written as "#/art/tags"

// TODO: Layout container width is currently 85% and 2000px max
// This is especially helpful on wide screens
// Have to go adjust it's children's (and also Navbar's) width to match

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/view/:filename" element={<ArtView />} />
          <Route path="/art/tags" element={<ArtTags />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/view/:filename" element={<MusicView />} />
          <Route path="/docs" element={<Docs />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
