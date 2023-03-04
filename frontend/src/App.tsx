import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import Layout from './components/layout/Layout';
import useDarkMode from './hooks/useDarkMode';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { darkTheme, lightTheme } from './theme';

function Decks() {
  return <p>My Decks</p>;
}
function Labels() {
  return <p>My Labels</p>;
}

function App() {
  const [darkMode, setMode] = useDarkMode();

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <FontStyles />
        <GlobalStyle />
        <Layout setMode={setMode} darkMode={darkMode}>
          <Routes>
            <Route path="/" element={<Navigate to="/decks" />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
