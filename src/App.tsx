import React, { useState } from "react";
import Routes from "./Routes";
import ScrollController from 'helpers/ScrollController';
import TopNav from 'components/TopNav';
import NavBar from 'components/NavBar';
import Footer from 'components/Footer';
import styles from "./App.module.sass";
import { ThemeContextProvider } from 'containers/ThemeContext';
import * as Colors from "data/colors";

function App() {
  const [theme, setTheme] = useState(Colors.YOLK_THEME);

  return (
    <div className={styles.App}>
      <ThemeContextProvider value={theme}>
        <ScrollController />
        <TopNav />
        <NavBar />
        <div className={styles.content}>
          <Routes
            appProps={{
              app: true,
              setTheme: setTheme
            }}
          />
          <Footer />
        </div>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
