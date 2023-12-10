import styled from 'styled-components';
import { Card } from '../../../types';
import CardGalleryItem from './CardGalleryItem';

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
  cards: Card[];
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
