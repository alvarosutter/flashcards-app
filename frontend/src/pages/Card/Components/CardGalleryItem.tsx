import styled from 'styled-components';
import { Card } from '../../../types';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 1px 4px,
    ${({ theme }) => theme.colors.primaryDarker} 0px 0px 0px 3px;
  width: 170px;
  height: 170px;
  margin: 15px 15px;
  padding: 10px;
  &:hover {
    filter: brightness(1.1);
    transform: scale(0.99);
    cursor: pointer;
  }
`;

const NameBox = styled.div`
  flex: 2;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2px 5px;
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: center;
  letter-spacing: 0.1em;
  font-family: ${({ theme }) => theme.fonts.headersFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  inline-size: 150px;
  height: 100px;
  margin: 0;
  padding: 0;
  overflow-wrap: break-word;
  overflow: auto;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardInfo = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.altText};
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  width: 100%;
  padding: 2px 5px;
  text-overflow: ellipsis;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  user-select: none;
  /* width */
  ::-webkit-scrollbar {
    height: 2.5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scrollbarBg};
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.altText};
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.altText};
  }
`;

interface CardGalleryItemProps {
  card: Card;
  setSelectedCard: (card: Card) => void;
}

function CardGalleryItem({ card, setSelectedCard }: CardGalleryItemProps) {
  const { name, labels } = card;
  return (
    <Box
      onClick={() => {
        setSelectedCard(card);
      }}
    >
      <NameBox>
        <Name>{name}</Name>
      </NameBox>
      <InfoBox>
        <CardInfo>{labels.map((label) => label.name).join(', ')}</CardInfo>
      </InfoBox>
    </Box>
  );
}

export default CardGalleryItem;
