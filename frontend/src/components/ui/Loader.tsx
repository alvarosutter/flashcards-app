import styled from 'styled-components';

const Loader = styled.div`
  cursor: progress;
  border: 16px solid ${({ theme }) => theme.colors.scrollbarBg};
  border-top: 16px solid ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media (min-width: 350px) {
    width: 65px;
    height: 65px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 85px;
    height: 85px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100px;
    height: 100px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
`;

function LoaderRing() {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
}

export default LoaderRing;
