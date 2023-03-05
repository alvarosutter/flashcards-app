import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import Layout from './components/layout/Layout';
import useDarkMode from './hooks/useDarkMode';
import DeckPage from './pages/Deck/DeckPage';
import LabelPage from './pages/Label/LabelPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import { darkTheme, lightTheme } from './theme';

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
            <Route path="/decks" element={<DeckPage />} />
            <Route path="/labels" element={<LabelPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
