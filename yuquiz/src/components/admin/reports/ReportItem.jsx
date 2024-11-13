import React from 'react';
import styled from 'styled-components';

const ReportItem = ({ report }) => {
  const { reportId, reason, type } = report;

  return (
    <StyledTableRow>
      <TableCell>{reportId}</TableCell>
      <TableCell>{reason}</TableCell>
      <TableCell>{type}</TableCell>
    </StyledTableRow>
  );
};

export default ReportItem;

// Styled-components for ReportItem
const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #e2f0e2;
  }
`;

const TableCell = styled.td`
  padding: 8px 10px;
  border-bottom: 1px solid #ccc;
  font-size: 0.9rem;
  color: #333;
`;
