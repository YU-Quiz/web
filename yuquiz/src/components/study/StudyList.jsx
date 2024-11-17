import React from 'react';
import styled from 'styled-components';
import StudyItem from './StudyItem';

const StudyList = ({ studies }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>스터디 이름</TableHeader>
            <TableHeader>스터디장</TableHeader>
            <TableHeader>현재 인원</TableHeader>
            <TableHeader>상태</TableHeader>
            <TableHeader>등록 기간</TableHeader>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <StudyItem key={study.id} study={study} />
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default StudyList;

// Styled-components
const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
`;
