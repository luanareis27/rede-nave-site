import { Message } from "./Chatbot";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onRestart: () => void;
  onClose: () => void;
};

export default function ChatWindow({
  messages,
  setMessages,
  onRestart,
  onClose,
}: Props) {
  return (
    <div className="chatbot-window shadow-lg">
      <div className="chatbot-header">
        <span>Assistente Rede Nave</span>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      <ChatOptions
        messages={messages}
        setMessages={setMessages}
        onRestart={onRestart}
      />
    </div>
  );
}
