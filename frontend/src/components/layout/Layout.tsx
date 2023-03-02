import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Logo from './Logo';
import Navbar from './Navbar';

const Main = styled.main`
  display: flex;
  min-height: calc(100vh);
  max-width: 90%;
  margin: auto;
  padding: 10px 25px;
`;
interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
  showNav: boolean;
  setMode: (darkMode: boolean) => void;
  darkMode: boolean;
}

function Layout({ children, showNav, setMode, darkMode }: LayoutProps) {
  return (
    <>
      <Header>
        <Logo />
        {showNav && <Navbar setMode={setMode} darkMode={darkMode} />}
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

export default Layout;
