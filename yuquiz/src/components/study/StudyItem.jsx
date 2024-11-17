import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StudyItem = ({ study }) => {
  const { id, name, curUser, leaderName, maxUser, state, registerDuration } = study;

  return (
    <TableRow>
      <TableCell>
        <StyledLink to={`/study/${id}`}>{name}</StyledLink>
      </TableCell>
      <TableCell>{leaderName}</TableCell>
      <TableCell>{curUser} / {maxUser}</TableCell>
      <TableCell>{state}</TableCell>
      <TableCell>{new Date(registerDuration).toLocaleString()}</TableCell>
    </TableRow>
  );
};

export default StudyItem;

// Styled-components
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
