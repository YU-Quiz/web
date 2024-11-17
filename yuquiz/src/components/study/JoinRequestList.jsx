import React from 'react';
import styled from 'styled-components';
import JoinRequestItem from './JoinRequestItem';

const JoinRequestList = ({ requests, onAccept }) => {
    console.log(requests);
  return (
    <List>
      {requests.map((request) => (
        <JoinRequestItem
          key={request.userId}
          request={request}
          onAccept={onAccept}
        />
      ))}
    </List>
  );
};

export default JoinRequestList;

// Styled Components
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 100%;
  overflow-y: auto;
`;
