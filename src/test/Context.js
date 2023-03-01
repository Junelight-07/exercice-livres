import React, { useCallback, useContext, useMemo, useState } from "react";

const THEMES = {
  dark: { background: "#000", color: "#FFF", border: "soldi 1px #FFF" },
  light: { background: "#FFF", color: "#000", border: "soldi 1px #000" },
};

const ThemeContext = React.createContext({
  theme: THEMES.dark,
  toggleTheme: () => {},
});

export default function Context() {
  function SearchForm() {
    return (
      <div>
        <input />
        <ThemedButtonClass>Rechercher</ThemedButtonClass>
      </div>
    );
  }

  function Toolbar() {
    return (
      <div>
        <SearchForm />
        <ThemedButton>S'inscrire</ThemedButton>
      </div>
    );
  }

  class ThemedButtonClass extends React.Component {
    render() {
      const { children } = this.props;
      const { theme } = this.context;
      return <button style={theme}>{children}</button>;
    }
  }

  ThemedButtonClass.contextType = ThemeContext;

  function ThemedButton({ children }) {
    const { theme } = useContext(ThemeContext);
    return <button style={theme}>{children}</button>;
  }

  function App() {
    const [theme, setTheme] = useState("light");
    const toggleTheme = useCallback(function () {
      setTheme((t) => (t === "light" ? "dark" : "light"));
    }, []);
    const value = useMemo(
      function () {
        return {
          theme: theme === "dark" ? THEMES.light : THEMES.dark,
          toggleTheme,
        };
      },
      [toggleTheme, theme]
    );

    return (
      <ThemeContext.Provider value={value}>
        <Toolbar />
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
  }

  function ThemeSwitcher() {
    const { toggleTheme } = useContext(ThemeContext);
    return <button onClick={toggleTheme}>Changer le thème</button>;
  }

  return <App />;
}
