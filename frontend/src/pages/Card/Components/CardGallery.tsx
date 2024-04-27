import styled from 'styled-components';

import CardGalleryItem from './CardGalleryItem';
import type { Card } from '../../../types';

const Gallery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 5px 5px;
`;
interface CardGalleryProps {
  cards: Array<Card>;
  setSelectedCard: (card: Card) => void;
}

function CardGallery({ cards, setSelectedCard }: CardGalleryProps) {
  return (
    <Gallery>
      {cards.map((card) => (
        <CardGalleryItem key={card.name} card={card} setSelectedCard={setSelectedCard} />
      ))}
    </Gallery>
  );
}

export default CardGallery;
