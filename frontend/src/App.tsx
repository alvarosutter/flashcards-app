import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontStyles, GlobalStyle, Layout } from './components/layout';
import useDarkMode from './hooks/useDarkMode';
import { darkTheme, lightTheme } from './theme';
import DeckPage from './pages/Deck/DeckPage';
import LabelPage from './pages/Label/LabelPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {
  const [darkMode, setMode] = useDarkMode();
  const REFRESH_INTERVAL = 1000 * 60 * 5;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: REFRESH_INTERVAL, refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
