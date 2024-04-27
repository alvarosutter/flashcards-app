import styled from 'styled-components';

import { DeleteButton, EditButton } from '../../../components/item';
import type { Label } from '../../../types';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 1px 4px,
    ${({ theme }) => theme.colors.primaryDarker} 0px 0px 0px 3px;
  width: 135px;
  min-height: max-content;
  margin: 15px 15px;
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
  overflow-wrap: break-word;
  overflow: auto;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LabelInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.altText};
  font-family: ${({ theme }) => theme.fonts.textFont};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  padding: 2px 5px;
  user-select: none;
`;

interface LabelGalleryItemProps {
  label: Label;
  setEditLabel: (label: Label) => void;
  setDeleteLabel: (label: Label) => void;
  setSelectedLabel: (label: Label) => void;
}

function LabelGalleryItem({
  label,
  setEditLabel,
  setDeleteLabel,
  setSelectedLabel,
}: LabelGalleryItemProps) {
  const { name, cards } = label;
  return (
    <Box
      onClick={() => {
        setSelectedLabel(label);
      }}
    >
      <InfoBox>
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            setDeleteLabel(label);
          }}
        />
      </InfoBox>
      <NameBox>
        <Name>{name}</Name>
      </NameBox>
      <InfoBox>
        <LabelInfo>
          cards:
          {cards.length}
        </LabelInfo>
        <EditButton
          width="12"
          height="12"
          onClick={(e) => {
            e.stopPropagation();
            setEditLabel(label);
          }}
        />
      </InfoBox>
    </Box>
  );
}

export default LabelGalleryItem;
