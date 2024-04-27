import styled from 'styled-components';

import AddButton from './AddButton';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 15px;
  width: 100%;
  height: fit-content;
  padding: 5px 5px;
  user-select: none;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
`;

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.small};
  padding: 0;
  margin: 0;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  width: 100%;
  margin: 5px auto;
`;

interface IDashboardBarProps {
  title?: string;
  addItem?: () => void;
  children: React.ReactNode | Array<React.ReactNode>;
}

function DashboardBar({ title = '', children, addItem = undefined }: IDashboardBarProps) {
  return (
    <>
      <Container>
        {title && <Title>{title}</Title>}
        {children}
        {addItem && (
          <AddButton title={`Add ${title?.slice(0, -1) || 'Card'}`} onClick={() => addItem()} />
        )}
      </Container>
      <Divider />
    </>
  );
}

export default DashboardBar;
