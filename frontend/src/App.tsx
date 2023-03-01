import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import FontStyles from './components/layout/FontStyles';
import GlobalStyle from './components/layout/GlobalStyle';
import { darkTheme } from './theme';

function App() {
  const [response, setResponse] = useState('');

  const pingBackend = async () => {
    const request = await fetch('http://localhost:4000/api/v1/', {
      headers: { 'content-type': 'application/json' },
    });
    if (request.status === 200) {
      const responseJSON = await request.json();
      setResponse(responseJSON.message);
      return;
    }
    setResponse('Could Not Connect to Backend!');
  };

  useEffect(() => {
    pingBackend();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <FontStyles />
        <GlobalStyle />
        <p>{response}</p>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
