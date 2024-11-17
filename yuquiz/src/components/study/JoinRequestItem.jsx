import React from 'react';
import styled from 'styled-components';

const JoinRequestItem = ({ request, onAccept }) => {
  const handleAccept = () => {
    onAccept(request.userId);
  };

  return (
    <ItemContainer>
      <Info>
        <Username>{request.name}</Username>
        <RequestDate>{new Date(request.requestAt).toLocaleDateString()}</RequestDate>
      </Info>
      <AcceptButton onClick={handleAccept}>가입 수락</AcceptButton>
    </ItemContainer>
  );
};

export default JoinRequestItem;

// Styled Components
const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
`;

const RequestDate = styled.span`
  font-size: 12px;
  color: #7f8c8d;
`;

const AcceptButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #1abc9c;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #16a085;
  }
`;
