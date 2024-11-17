import React from 'react';
import styled from 'styled-components';
import MemberItem from './MemberItem';

const MemberList = ({ members, role, onRemoveMember }) => {
  const isLeader = role === 'LEADER'; // 리더 여부 확인

  return (
    <ListContainer>
      {members.map((member) => (
        <MemberItem
          key={member.userId}
          member={member}
          isLeader={isLeader}
          onRemove={onRemoveMember}
        />
      ))}
    </ListContainer>
  );
};

export default MemberList;

// Styled Components
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
