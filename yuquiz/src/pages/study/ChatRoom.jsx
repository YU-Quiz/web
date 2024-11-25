import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { showStudy } from "../../services/study/studyService";
import { useLoaderData } from "react-router-dom";
import { getStudyMembers } from "../../services/study/studyGroupService";
import { getDailyChatLogs } from "../../services/chat/chatService";
import useWebSocket from "../../hooks/useWebSocket";
import { getUser } from "../../services/user/userService";
import useAuthStore from "../../stores/auth/authStore";
import parseJwtWithBearer from "../../utils/parseJWT";
import formatDate from "../../utils/formatDate";

export async function chatRoomLoader({ params }) {
  const { studyId, chatId } = params;
  const {nickname} = await getUser();

  const studyData = await showStudy(studyId);
  const members = await getStudyMembers(studyId);

  // 일간 채팅 로그 가져오기
  const chatLogs = await getDailyChatLogs(chatId);

  return {
    studyData,
    roomId: chatId,
    members,
    chatLogs, // 초기 채팅 로그 추가
    sender: nickname,
  };
}

const ChatRoom = () => {
  const { studyData, roomId, members, chatLogs, sender } = useLoaderData();
  const { accessToken} = useAuthStore();
  const {userId} = parseJwtWithBearer(accessToken);
  // console.log(parseJwtWithBearer(accessToken));
  // console.log(studyData);
  
  const [messages, setMessages] = useState(chatLogs);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatBodyRef = useRef(null);

  // WebSocket 연결
  const { sendMessage } = useWebSocket(roomId, (newMessage) => {
    if (chatBodyRef.current) {
      const isScrolledToBottom =
        chatBodyRef.current.scrollHeight - chatBodyRef.current.scrollTop ===
        chatBodyRef.current.clientHeight;

      // 새 메시지 추가
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // 스크롤이 맨 아래일 경우 자동으로 스크롤
      if (isScrolledToBottom) {
        setTimeout(() => {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }, 0);
      }
    }
  }); // 연결 상태 가져오기

  // 페이지 첫 로딩 시 스크롤 맨 아래로
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = () => {

    if (input.trim()) {
      const newMessage = {
        roomId: `${roomId}`,  
        sender: sender, // 임시 사용자
        // userId: 59,
        content: input,
        // createdAt: new Date().toISOString(),
        type: "TALK",
      };

      // 메시지 전송
      sendMessage(newMessage);

      // 스크롤을 맨 아래로 이동
      setTimeout(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, 0);

      // 입력 필드 초기화
      setInput("");
    }
  };

  return (
    <Container>
      {/* 스터디 정보 */}
      <StudyHeader>
        <h1>{studyData.Name}</h1>
        {/* <StudyDetails>
          {studyData.description}
        </StudyDetails> */}
      </StudyHeader>

      <ChatHeader>
        <h2>Study Chat</h2>
        <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </MenuIcon>
      </ChatHeader>

      <ContentArea>
        <ChatBody ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isMe={msg.userId === userId}>
              <UserInfo>
                <UserName isMe={msg.userId === userId}>{msg.sender}</UserName>
              </UserInfo>
              <MessageText isMe={msg.userId === userId}>{msg.content}</MessageText>
              <TimeStamp isMe={msg.userId === userId}>{formatDate(msg.createdAt)}</TimeStamp>
            </MessageContainer>
          ))}
        </ChatBody>

        <Sidebar isOpen={isSidebarOpen}>
          <SidebarHeader>Members</SidebarHeader>
          <MemberList>
                {members.map((member, index) => (
                  <MemberItem key={index}>{member.nickname}</MemberItem>
                ))}
          </MemberList>
          
        </Sidebar>
      </ContentArea>

      <ChatFooter>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </ChatFooter>
    </Container>
  );
};

export default ChatRoom;

// Styled Components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #005bb5;
  border-radius: 10px;
  padding: 10px;
`;

export const StudyHeader = styled.div`
  background-color: #005bb5;
  color: white;
  text-align: center;
  padding: 15px;
  h1 {
    margin: 0 0 10px 0;
  }
`;

export const StudyDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export const ChatHeader = styled.div`
  height: 60px;
  padding: 10px 20px;
  background-color: #0082ce;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuIcon = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;

  &:hover {
    color: #eeeeee;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #eaf6ff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 70vh;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #7aa7d9;
`;

export const UserName = styled.span`
  font-weight: bold;
  color: ${(props) => (props.isMe ? "#7ac3ff" : "#ff7a7a")};
`;

export const TimeStamp = styled.span`
  font-size: 12px;
  color: #004a91;
`;

export const MessageText = styled.div`
  padding: 10px;
  max-width: 60%;
  background-color: ${(props) => (props.isMe ? "#005bb5" : "#2e96ff")};
  color: white;
  border-radius: 8px;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "0")};
  background-color: #21214c;
  color: white;
  overflow: hidden;
  transition: width 0.4s ease;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: 15px;
  background-color: #333366;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

export const MemberList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

export const MemberItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444488;
  }
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
