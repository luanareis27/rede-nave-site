import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./Chatbot.css";

export type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
};

const initialMessage: Message = {
  id: 1,
  text: "Olá 👋 Sou a assistente da Rede Nave. Como posso te ajudar hoje?",
  sender: "bot",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const restartConversation = () => {
    setMessages([initialMessage]);
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          onRestart={restartConversation}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
