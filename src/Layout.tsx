import NavBar from "./assets/components/NavBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import useLocalStorage from "use-local-storage";

const themeData = await fetch("/unearthed-archives/ThemeData.json").then((r) =>
  r.json()
);

// TODO: MAKE THIS AN IMPORT- Themes.tsx ALSO USES THIS AND IT WOULD BE AWFUL TO DESYNRHOCTNIZE IT
type themeString =
  | "light"
  | "dark"
  | "um-light"
  | "um-dark"
  | "azure"
  | "nikte-orange"
  | "nikte-purple";

// Represents a theme and its information
type themeItem = {
  name: string;
  displayName: string;
  logoImage: string;
  homeNavImage: string;
  backgroundImage?: string;
  type: "light" | "dark" | "single";
  partnerTheme: themeString;
  thumbnailFile: string;
};

const Layout = () => {
  const [theme, setTheme] = useLocalStorage<themeString>("theme", "um-light");
  const [curThemeInfo, setCurThemeInfo] = useState<themeItem>(themeData[theme]);

  // Detects when theme is changed
  // Updates the HTML tag (the visual appearance) and the curThemeInfo object
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    setCurThemeInfo(themeData[theme]);
  }, [theme]);

  const toggleDarkTheme = () => {
    setTheme(curThemeInfo.partnerTheme);
  };

  return (
    <>
      <NavBar
        themeType={curThemeInfo.type}
        homeIcon={curThemeInfo.homeNavImage}
        themeSwitchFunction={toggleDarkTheme}
      />
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${curThemeInfo.backgroundImage || ""})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
      >
        <br />
        <br />
        <Container
          className="bg-body rounded px-4"
          style={{
            width: "82%",
          }}
        >
          <main>
            <Outlet />
          </main>
        </Container>
        <br />
        <br />
      </div>
    </>
  );
};

export default Layout;
