import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import Layout from './components/layout/Layout';
import useDarkMode from './hooks/useDarkMode';
import { darkTheme, lightTheme } from './theme';

function App() {
  const [darkMode, setMode] = useDarkMode();

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <FontStyles />
        <GlobalStyle />
        <Layout showNav setMode={setMode} darkMode={darkMode}>
          <p>Hello Flashcards</p>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
