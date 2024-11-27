import React from 'react';
import styled from 'styled-components';
import NoticeItem from './NoticeItem';

const NoticeList = ({ notices }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>작성일</TableHeader>
            <TableHeader>좋아요</TableHeader>
            <TableHeader>조회수</TableHeader>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <NoticeItem key={notice.postId} notice={notice} />
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default NoticeList;

// Styled-components
const TableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

const TableHeader = styled.th`
  background-color: #0056b3;
  color: #fff;
  font-weight: bold;
  padding: 12px;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  border-bottom: 2px solid #e0e0e0;
`;
