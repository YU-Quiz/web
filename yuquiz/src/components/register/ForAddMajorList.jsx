import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMajorList } from "../../services/auth/register/Register";

const SeriesContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const MajorListContainer = styled.div`
  max-height: 460px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;

  p {
    font-size: 14px;
    color: #666;
  }
`;

const MajorItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f9f9f9;

  &:hover {
    background-color: #ececec;
  }
`;

const ForAddMajorList = ({ onAddMajor }) => {
  const [majorList, setMajorList] = useState([]);
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMajorList = async () => {
      try {
        const majors = await getMajorList(); // 전공 목록 가져오기
        setMajorList(majors || []);
        setFilteredMajors(majors || []);
      } catch (error) {
        console.error("전공 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchMajorList();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredMajors(
      majorList.filter((major) => major.name.toLowerCase().includes(query))
    );
  };

  return (
    <SeriesContainer>
      <SearchInput
        type="text"
        placeholder="전공을 검색하여 클릭하세요."
        value={searchQuery}
        onChange={handleSearch}
      />
      <MajorListContainer>
        {filteredMajors.length > 0 ? (
          filteredMajors.map((major) => (
            <MajorItem key={major.id} onClick={() => onAddMajor(major)}>
              {major.name}
            </MajorItem>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </MajorListContainer>
    </SeriesContainer>
  );
};

export default ForAddMajorList;
