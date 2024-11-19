import React, { useState } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi"; // 햄버거 아이콘

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림 상태

  // 멤버 목록 예시 데이터
  const members = ["Alice", "Bob", "Charlie", "David"];

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { user: "Me", content: input }]);
      setInput("");
    }
  };

  return (
    <Container>
      <ChatArea>
        <ChatHeader>
          <MenuIcon onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu size={24} />
          </MenuIcon>
          <h2>Study Chat</h2>
        </ChatHeader>
        <ChatBody>
          {messages.map((msg, index) => (
            <Message key={index}>
              <strong>{msg.user}: </strong>
              {msg.content}
            </Message>
          ))}
        </ChatBody>
        <ChatFooter>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </ChatFooter>
      </ChatArea>
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <h3>Members</h3>
          <CloseButton onClick={() => setSidebarOpen(false)}>×</CloseButton>
        </SidebarHeader>
        <MemberList>
          {members.map((member, index) => (
            <MemberItem key={index}>{member}</MemberItem>
          ))}
        </MemberList>
      </Sidebar>
    </Container>
  );
};

export default ChatRoom;

// Styled Components
export const Container = styled.div`
  display: flex;
  height: 100vh; /* 화면 전체 높이 */
  width: 100%;
  background-color: #f9f9f9;
  position: relative;
`;

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-250px")}; /* 컴포넌트 안에서만 슬라이드 */
  width: 250px;
  height: 100%;
  background-color: #f1f1f1;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease-in-out;
  z-index: 2;
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #6200ea;
  color: white;

  h3 {
    margin: 0;
    font-size: 18px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

export const MemberList = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MemberItem = styled.li`
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #e1e1e1;
  }
`;

export const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ChatHeader = styled.div`
  height: 60px;
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
  }
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  color: white;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #ffffff;
`;

export const Message = styled.div`
  margin: 5px 0;
  padding: 10px;
  background-color: #e1f5fe;
  border-radius: 5px;
  max-width: 60%;
  align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
`;

export const ChatFooter = styled.div`
  height: 60px;
  display: flex;
  padding: 10px;
  background-color: #eeeeee;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SendButton = styled.button`
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
