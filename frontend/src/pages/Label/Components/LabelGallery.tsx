import styled from 'styled-components';
import { Label } from '../../../services/Flashcards/flashcardsUtils';

import LabelGalleryItem from './LabelGalleryItem';

const Gallery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 5px 5px;
`;
interface LabelGalleryProps {
  labels: Label[];
  setEditLabel: (label: Label) => void;
  setDeleteLabel: (label: Label) => void;
  setSelectedLabel: (label: Label) => void;
}

function LabelGallery({ labels, setEditLabel, setDeleteLabel, setSelectedLabel }: LabelGalleryProps) {
  return (
    <Gallery>
      {labels.map((label) => (
        <LabelGalleryItem
          key={label.labelName}
          label={label}
          setEditLabel={setEditLabel}
          setDeleteLabel={setDeleteLabel}
          setSelectedLabel={setSelectedLabel}
        />
      ))}
    </Gallery>
  );
}

export default LabelGallery;