import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.1em;
  margin: 0;
  padding: 0;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.altText};
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;
  letter-spacing: 0.05em;
  margin: 0;
  padding: 0;
`;

function NotFoundPage() {
  return (
    <Container>
      <Text>404</Text>
      <SubText>Page Not Found</SubText>
    </Container>
  );
}

export default NotFoundPage;
