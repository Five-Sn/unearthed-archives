import NavBar from "./assets/components/NavBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import useLocalStorage from "use-local-storage";

const themeData = await fetch("/unearthed-archives/ThemeData.json").then((r) =>
  r.json()
);

// Represents a theme and its information
type themeItem = {
  name: string;
  displayName: string;
  backgroundImage?: string;
  type: "light" | "dark" | "single";
  partnerTheme: "light" | "dark" | "um-light" | "um-dark";
};

const Layout = () => {
  /*const [theme, setTheme] = useState<"light" | "dark" | "um-light" | "um-dark">(
    "um-dark"
  );*/
  const [theme, setTheme] = useLocalStorage<
    "light" | "dark" | "um-light" | "um-dark"
  >("theme", "um-dark");
  const [curThemeInfo, setCurThemeInfo] = useState<themeItem>(themeData[theme]);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleDarkTheme = () => {
    setTheme(curThemeInfo.partnerTheme);
    // This has to be done this way cause setTheme doesn't update fast enough to use it
    setCurThemeInfo(themeData[curThemeInfo.partnerTheme]);
  };

  return (
    <>
      <NavBar
        themeType={curThemeInfo.type}
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
        <Container
          className="bg-body"
          style={{
            width: "85%",
            maxWidth: "2000px",
          }}
        >
          <main>
            <Outlet />
          </main>
        </Container>
        <br />
      </div>
    </>
  );
};

export default Layout;
