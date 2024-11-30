import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StudyItem = ({ study }) => {
  const { id, name, curUser, leaderName, maxUser, state, registerDuration } = study;

  // 상태에 따라 텍스트를 변환하는 함수
  const getStateText = (state) => {
    switch (state) {
      case "ACTIVE":
        return "활동 중";
      case "COMPLETED":
        return "활동 종료";
      default:
        return "알 수 없음"; // 추가적인 상태 처리
    }
  };

  return (
    <TableRow>
      <TableCell>
        <StyledLink to={`/study/${id}`}>{name}</StyledLink>
      </TableCell>
      <TableCell>{leaderName}</TableCell>
      <TableCell>{curUser} / {maxUser}</TableCell>
      <TableCell>{getStateText(state)}</TableCell> {/* 상태 텍스트 렌더링 */}
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
