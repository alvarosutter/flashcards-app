import styled from 'styled-components';

import DeckGalleryItem from './DeckGalleryItem';
import type { Deck } from '../../../types';

const Gallery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 5px 5px;
`;

interface DeckGalleryProps {
  decks: Array<Deck>;
  setEditDeck: (deck: Deck) => void;
  setDeleteDeck: (deck: Deck) => void;
  setSelectedDeck: (deck: Deck) => void;
}

function DeckGallery({ decks, setEditDeck, setDeleteDeck, setSelectedDeck }: DeckGalleryProps) {
  return (
    <Gallery>
      {decks.map((deck) => (
        <DeckGalleryItem
          key={deck.name}
          deck={deck}
          setEditDeck={setEditDeck}
          setDeleteDeck={setDeleteDeck}
          setSelectedDeck={setSelectedDeck}
        />
      ))}
    </Gallery>
  );
}

export default DeckGallery;
