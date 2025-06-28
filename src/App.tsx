import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./assets/pages/Home";
import Art from "./assets/pages/Art";
import ArtTags from "./assets/pages/ArtTags";
import Music from "./assets/pages/Music";
import MusicView from "./assets/pages/MusicView";

// NOTE:
// If you replace HashRouter with another system, change the links else where
// Like the link from /art to /art/tags, because that's written as "#/art/tags"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/art" element={<Art />} />
          <Route path="/art/tags" element={<ArtTags />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/view/:filename" element={<MusicView />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
