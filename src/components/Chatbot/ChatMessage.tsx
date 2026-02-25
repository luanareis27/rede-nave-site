import { Message } from "./Chatbot";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  return (
    <div className={`chat-message ${message.sender}`}>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
}
