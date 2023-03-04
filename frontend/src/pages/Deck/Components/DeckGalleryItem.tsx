import styled from 'styled-components';
import EditButton from '../../../components/ui/EditButton';
import TrashButton from '../../../components/ui/TrashButton';
import { Deck } from '../../../services/Flashcards/flashcardsUtils';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.inputBg};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  width: 150px;
  height: 200px;
  margin: 15px 15px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, ${({ theme }) => theme.colors.primary} 0px 0px 0px 3px;
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
  font-family: ${(props) => props.theme.fonts.headersFont}, sans-serif;
  font-weight: 300;
  inline-size: 150px;
  overflow-wrap: break-word;
  overflow: auto;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DeckInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.altText};
  padding: 2px 5px;
  font-size: 0.7em;
  user-select: none;
`;

interface DeckGalleryItemProps {
  deck: Deck;
  setEditDeck: (deck: Deck) => void;
  setDeleteDeck: (deck: Deck) => void;
  setSelectedDeck: (deck: Deck) => void;
}

function DeckGalleryItem({ deck, setEditDeck, setDeleteDeck, setSelectedDeck }: DeckGalleryItemProps) {
  const { deckName, cards } = deck;
  return (
    <Box
      onClick={() => {
        setSelectedDeck(deck);
      }}
    >
      <InfoBox>
        <TrashButton
          onClick={(e) => {
            e.stopPropagation();
            setDeleteDeck(deck);
          }}
        />
      </InfoBox>
      <NameBox>
        <Name>{deckName}</Name>
      </NameBox>
      <InfoBox>
        <DeckInfo>cards: {cards.length}</DeckInfo>
        <EditButton
          width="13"
          height="13"
          onClick={(e) => {
            e.stopPropagation();
            setEditDeck(deck);
          }}
        />
      </InfoBox>
    </Box>
  );
}

export default DeckGalleryItem;
