import React, { useState } from "react";
import styled from "styled-components";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, { user: "Me", content: input }]);
      setInput("");
    }
  };

  return (
    <Container>
      <ChatHeader>
        <h2>Chat Room</h2>
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
    </Container>
  );
};

export default ChatRoom;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
`;

export const ChatHeader = styled.div`
  padding: 10px;
  background-color: #6200ea;
  color: white;
  text-align: center;
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
  display: flex;
  padding: 10px;
  background-color: #eeeeee;
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
