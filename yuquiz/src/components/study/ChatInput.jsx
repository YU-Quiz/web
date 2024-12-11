import React, { useState } from "react";
import styled from "styled-components";

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput(""); // 입력값 초기화
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="채팅을 입력해주세요..."
      />
      <SendButton onClick={handleSendMessage}>전송</SendButton>
    </InputContainer>
  );
};

export default ChatInput;

// Styled Components
const InputContainer = styled.div`
  height: 60px;
  display: flex;
  padding: 10px;
  background-color: #eeeeee;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #3700b3;
  }
`;
