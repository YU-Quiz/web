import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { showStudy } from "../../services/study/studyService";
import { useLoaderData } from "react-router-dom";
import { getStudyMembers } from "../../services/study/studyGroupService";
import { Stomp } from "@stomp/stompjs";
import axios from "axios";

export async function chatRoomLoader({ params }){
  const { studyId, chatId } = params;

  const studyData = await showStudy(studyId);
  const members = await getStudyMembers(studyId);

  return {
    studyData: studyData,
    chatId: chatId, // 임시
    members: members,
  };
}

const ChatRoom = () => {
  const { studyData, chatId, members } = useLoaderData();
  console.log(members);

  const stompClient = useRef(null);
  const [messages, setMessages] = useState([
    { user: "Me", content: "ㅎㅇ" },
    { user: "DaeYoung0726", content: "ㅎㅇ" },
    { user: "gardenzeeero", content: "ㅎㅇ" },
    { user: "sernan96", content: "ㅎㅇ" },
    { user: "Uralauah", content: "ㅎㅇ" },
    { user: "띵재", content: "ㅎㅇ" },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // connect();
    // fetchMessages();
    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    // return () => disconnect();
  }, []);

  // 웹소켓 연결
  const connect = () =>{
    const socket = new WebSocket("/ws");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, ()=>{
      stompClient.current.subscribe(`/sub/${chatId}`, (message) =>{
        const newMessage = JSON.parse(message.body);
        setMessages((prev)=>[...prev, newMessage]);
      })
    });
  }

  const fetchMessages = () =>{
    // return axios.get()
  }

  const disconnect = () =>{
    if(stompClient.current){
      stompClient.current.disconnect();
    }
  }

  const handleSendMessage = () => {
    if (input.trim() !== "" && stompClient.current) {
      setMessages((prev) => [...prev, { user: "Me", content: input }]);

      // stompClient.current.send(`/pub/message/${chatId}`, {}, JSON.stringify(body) );
      setInput("");
    }
  };

  return (
    <Container>
      {/* 스터디 정보 */}
      <StudyHeader>
        <h1>{studyData.Name}</h1>
        <ProgressBar>
          <ProgressFill style={{ width: `60%` }} />
        </ProgressBar>
        <StudyDetails>
          진행률: 60%
        </StudyDetails>
      </StudyHeader>

      <ChatHeader>
        <h2>Study Chat</h2>
        <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu size={24} />
        </MenuIcon>
      </ChatHeader>

      <ContentArea>
        <ChatBody>
          {messages.map((msg, index) => (
            <MessageContainer key={index} isMe={msg.user === "Me"}>
              <UserInfo>
                <UserName isMe={msg.user === "Me"}>{msg.user}</UserName>
                <TimeStamp>오후 2:37:41</TimeStamp>
              </UserInfo>
              <MessageText isMe={msg.user === "Me"}>{msg.content}</MessageText>
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

export const ProgressBar = styled.div`
  background-color: #eaf6ff;
  width: 80%;
  height: 10px;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
`;

export const ProgressFill = styled.div`
  background-color: #2e96ff;
  height: 100%;
  border-radius: 5px;
  transition: width 0.4s ease;
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
  font-size: 12px;
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
