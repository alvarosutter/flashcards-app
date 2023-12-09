import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
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
  overflow: auto;
  backdrop-filter: blur(2px);
`;

const ModalHolder = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 5px;
  background-color: ${({ theme }) => theme.colors.modalBg};
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  min-width: 30%;
  max-width: 90%;
  margin: 0;
  padding: 0 15px;
`;

const ModalCloseButton = styled.p`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.altText};
  padding: 0 15px;
  margin: 0;
  font-size: 1.5em;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const ModalTitle = styled.p`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.primaryText};
  margin: 0;
  padding: 0 15px;
  font-family: ${({ theme }) => theme.fonts.headersFont}, sans-serif;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  letter-spacing: 0.05em;
  user-select: none;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.altText};
  margin: 0;
  padding: 0;
  width: 100%;
`;

interface ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onCancel: () => void;
}

function Modal({ children, title, isOpen, onCancel }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // eslint-disable-next-line default-case
      switch (e.code) {
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
  }, [isOpen]);

  return (
    isOpen && (
      <ModalOverlay>
        <ModalHolder onClick={(e) => e.stopPropagation()}>
          <ModalCloseButton onClick={onCancel}>&times;</ModalCloseButton>
          <ModalTitle>{title}</ModalTitle>
          <Divider />
          {children}
        </ModalHolder>
      </ModalOverlay>
    )
  );
}

export default Modal;
