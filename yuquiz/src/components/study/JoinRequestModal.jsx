import React from 'react';
import styled from 'styled-components';
import JoinRequestList from './JoinRequestList';

const JoinRequestModal = ({
  isOpen,
  onClose,
  requests,
  isLoading,
  error,
  onAccept,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>가입 신청 목록</ModalTitle>
        {isLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <JoinRequestList requests={requests} onAccept={onAccept} />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default JoinRequestModal;

// Styled Components for Modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 60%;
  height: 60%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #7f8c8d;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #e74c3c;
`;
