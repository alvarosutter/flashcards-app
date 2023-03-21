import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditButton from '../../../components/dashboard/EditButton';
import { Card } from '../../../services/Flashcards/flashcardsUtils';

const SliderOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  backdrop-filter: blur(2px);
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.headerBg};
  border-radius: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 90%;
  min-height: 50%;
  padding: 10px 15px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  user-select: none;
`;

const ExitButton = styled.div`
  color: ${({ theme }) => theme.colors.altText};
  background: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.btnFont};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`;

const MiddleBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  width: inherit;
  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;

const ChangeCardButton = styled.button`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.altText};
  background: none;
  border: none;
  height: 100%;
  &:hover {
    filter: brightness(1.3);
    cursor: pointer;
  }
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 5px;
  overflow-wrap: break-word;
`;
const Text = styled.p`
  color: ${({ theme }) => theme.colors.primaryText};
  font-family: ${({ theme }) => theme.fonts.textFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 5px;
  overflow-y: auto;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.small};
  user-select: none;
`;

const CardInfo = styled.div`
  align-self: center;
  color: ${({ theme }) => theme.colors.altText};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-family: ${({ theme }) => theme.fonts.altFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  background: none;
  border: none;
  width: 90%;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  user-select: none;
  // overflow-x: hidden;
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

const CardNumber = styled.div`
  align-self: center;
  color: ${({ theme }) => theme.colors.altText};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-family: ${({ theme }) => theme.fonts.altFont}, sans-serif;
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  background: none;
  border: none;
`;

interface CardSliderProps {
  cards: Card[];
  position: number;
  isOpen: boolean;
  onCancel: () => void;
  onEdit: (card: Card) => void;
}

function CardSlider({ cards, position, isOpen, onCancel, onEdit }: CardSliderProps) {
  const [isFront, setIsFront] = useState(true);
  const [index, setIndex] = useState(position);
  const [current, setCurrent] = useState<Card>(cards[position]);

  useEffect(() => {
    setCurrent(cards[index]);
  }, [index]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // eslint-disable-next-line default-case
      switch (e.code) {
        case 'Enter':
        case 'Space': {
          e.preventDefault();
          setIsFront((prev) => !prev);
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          setIsFront(true);
          if (index !== 0) setIndex((prev) => prev - 1);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          setIsFront(true);
          if (cards.length !== 0 && cards.length - 1 !== index) setIndex((prev) => prev + 1);
          break;
        }
        case 'Escape': {
          onCancel();
          break;
        }
      }
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [isFront, index]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpen && (
        <SliderOverlay>
          <Container onClick={(e) => e.stopPropagation()} style={!isFront ? { filter: 'brightness(1.2)' } : {}}>
            <TopBox>
              <EditButton
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel();
                  onEdit(current);
                }}
              />
              <ExitButton onClick={onCancel}>&times;</ExitButton>
            </TopBox>
            <MiddleBox onClick={() => setIsFront((prev) => !prev)}>
              <ChangeCardButton
                title="Previous Card"
                style={index === 0 ? { visibility: 'hidden' } : {}}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFront(true);
                  setIndex((prev) => prev - 1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </ChangeCardButton>
              {isFront ? <Title>{current?.cardName}</Title> : <Text>{current?.content}</Text>}
              <ChangeCardButton
                title="Next Card"
                style={cards.length === 1 || cards.length - 1 === index ? { visibility: 'hidden' } : {}}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFront(true);
                  setIndex((prev) => prev + 1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </ChangeCardButton>
            </MiddleBox>
            <BottomBox>
              <CardInfo>{current.labels.map((label) => label.labelName).join(', ')}</CardInfo>
              <CardNumber>
                {index + 1}/{cards.length}
              </CardNumber>
            </BottomBox>
          </Container>
        </SliderOverlay>
      )}
    </>
  );
}

export default CardSlider;