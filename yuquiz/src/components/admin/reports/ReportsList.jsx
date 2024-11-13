import React from 'react';
import styled from 'styled-components';
import ReportItem from "./ReportItem";

const ReportsList = ({ reports }) => {
  return (
    <ListContainer>
      <StyledTable>
        <thead>
          <HeaderRow>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Reason</HeaderCell>
            <HeaderCell>Type</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {reports.map((report) => (
            <ReportItem key={report.reportId} report={report} />
          ))}
        </tbody>
      </StyledTable>
    </ListContainer>
  );
};

export default ReportsList;

// Styled-components for ReportsList
const ListContainer = styled.div`
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderRow = styled.tr`
  background-color: #86c232;
  color: white;
`;

const HeaderCell = styled.th`
  padding: 10px;
  border-bottom: 2px solid #2e7d32;
  text-align: left;
  font-weight: bold;
`;
