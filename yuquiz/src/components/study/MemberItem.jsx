import React from 'react';
import styled from 'styled-components';

const MemberItem = ({ member, isLeader, onRemove }) => {
  return (
    <ItemContainer role={member.role}>
      <PropertyContainer>
        <Nickname>{member.nickname}</Nickname>
      </PropertyContainer>
      <PropertyContainer>
        <JoinDate>{new Date(member.joinedAt).toLocaleDateString()}</JoinDate>
      </PropertyContainer>
      <PropertyContainer>
        <RoleBadge role={member.role}>{member.role === 'LEADER' ? '리더' : '회원'}</RoleBadge>
      </PropertyContainer>
      <PropertyContainer>
        {isLeader && member.role !== 'LEADER' && (
          <RemoveButton onClick={() => onRemove(member.userId)}>추방</RemoveButton>
        )}
      </PropertyContainer>
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
  background-color: ${(props) =>
    props.role === 'LEADER' ? '#c5d3ff' : '#b4f0ff'}; /* 리더: 노랑, 회원: 회색 */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 14px;
`;

const PropertyContainer = styled.div`
  flex: 1;
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const Nickname = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const JoinDate = styled.span`
  font-size: 12px;
  color: #95a5a6;
`;

const RoleBadge = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => (props.role === 'LEADER' ? '#d6af00' : '#1abc9c')};
  border-radius: 12px;
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
