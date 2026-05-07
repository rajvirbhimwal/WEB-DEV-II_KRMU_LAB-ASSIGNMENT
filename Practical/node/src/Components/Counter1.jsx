import React, { createContext, useContext, useState } from "react";
import "../App.css";

const Theme = createContext();
function ThemeProvider({ children }) {
 
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      {children}
    </Theme.Provider>
  );
}

function Home() {
  const { theme, toggleTheme } = useContext(Theme);

  return (
    <div className={theme ? "dark" : "light"}>
      <h1>{theme ? "Dark Theme" : "Light Theme"}</h1>

      <button onClick={toggleTheme}>
        {theme ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}


export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}