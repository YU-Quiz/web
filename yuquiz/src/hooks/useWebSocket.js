import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import useAuthStore from '../stores/auth/authStore';

const useWebSocket = (roomId, onMessageReceived) => {
  const clientRef = useRef(null);
  const [connected, setConnected] = useState(false); // 연결 상태 관리
  const { accessToken } = useAuthStore(); // accessToken 가져오기

  useEffect(() => {
    // STOMP 클라이언트 초기화
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      // debug: (msg) => console.log('STOMP: ', msg), // 디버깅 로그
      connectHeaders: {
        Authorization: `${accessToken}`,
        roomId: roomId,
        'accept-version': '1.2', // 서버에서 지원하는 STOMP 버전
        'heart-beat': '10000,10000', // Heartbeat 설정 (클라이언트와 서버 간 주기적인 Ping)
      },
      onConnect: () => {
        // console.log('Connected to WebSocket');
        setConnected(true); // 연결 성공 시 상태 업데이트
        // 채팅방 구독
        stompClient.subscribe(`/sub/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          if (onMessageReceived) {
            onMessageReceived(receivedMessage); // 메시지 전달
          }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        setConnected(false); // 연결 해제 시 상태 업데이트
      },
    });

    // 클라이언트 활성화
    stompClient.activate();
    clientRef.current = stompClient;

    // 클라이언트 비활성화 (컴포넌트 언마운트 시)
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = (message) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/pub/message/${roomId}`,
        body: JSON.stringify(message),
        headers: {
            // Authorization: `${accessToken}`, // 토큰 추가
            roomId: roomId,
            // userId: userId,
        },
      });
    }
  };

  return { connected, sendMessage }; // 연결 상태와 메시지 전송 함수 반환
};

export default useWebSocket;

