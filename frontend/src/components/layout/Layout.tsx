import type { ReactNode } from 'react';
import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';
import Logo from './Logo';
import Navbar from './Navbar';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh);
  max-width: 95%;
  margin: auto;
  padding: 10px 10px;
`;
interface ILayoutProps {
  children: ReactNode | Array<ReactNode>;
  setMode: (darkMode: boolean) => void;
  darkMode: boolean;
}

function Layout({ children, setMode, darkMode }: ILayoutProps) {
  return (
    <>
      <Header>
        <Logo />
        <Navbar setMode={setMode} darkMode={darkMode} />
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
