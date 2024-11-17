import React from 'react';
import styled from 'styled-components';

const MemberItem = ({ member, isLeader, onRemove }) => {
  return (
    <ItemContainer>
      <Nickname>{member.nickname}</Nickname>
      <JoinDate>({new Date(member.joinedAt).toLocaleDateString()})</JoinDate>
      <RoleBadge role={member.role}>{member.role === 'LEADER' ? '리더' : '회원'}</RoleBadge>
      <Actions>
        {isLeader && member.role !== 'LEADER' && (
          <RemoveButton onClick={() => onRemove(member.userId)}>삭제</RemoveButton>
        )}
      </Actions>
    </ItemContainer>
  );
};

export default MemberItem;

// Styled Components
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #d5eeff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 14px;
`;

const Nickname = styled.span`
  font-weight: bold;
  color: #2c3e50;
  margin-right: 8px;
`;

const JoinDate = styled.span`
  font-size: 12px;
  color: #95a5a6;
  margin-right: 8px;
`;

const RoleBadge = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.role === 'LEADER' ? '#3498db' : '#1abc9c')};
  border-radius: 12px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
