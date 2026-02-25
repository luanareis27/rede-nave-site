import { Button } from "react-bootstrap";
import { Message } from "./Chatbot";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onRestart: () => void;
};

export default function ChatOptions({
  messages,
  setMessages,
  onRestart,
}: Props) {
  const lastMessage = messages[messages.length - 1];

  const push = (user: string, bot: string) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: user, sender: "user" },
      { id: prev.length + 2, text: bot, sender: "bot" },
    ]);
  };

  // MENU INICIAL
  if (messages.length === 1) {
    return (
      <div className="chat-options">
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() =>
            push(
              "Quero conhecer as trilhas",
              "Temos trilhas de Gestão, Marketing e Liderança. Qual você quer conhecer?"
            )
          }
        >
          📚 Trilhas
        </Button>

        <Button
          size="sm"
          variant="outline-primary"
          onClick={() =>
            push(
              "Como funciona a matrícula?",
              "Você faz login, escolhe a trilha e começa a aprender no seu ritmo."
            )
          }
        >
          📝 Matrícula
        </Button>

        <Button
          size="sm"
          variant="outline-primary"
          onClick={() =>
            push(
              "Problemas com login",
              "Sem problemas 😊 Você pode recuperar sua senha rapidamente."
            )
          }
        >
          🔐 Login
        </Button>
      </div>
    );
  }

  // SUBMENU TRILHAS
  if (lastMessage.text.includes("Qual você quer conhecer")) {
    return (
      <div className="chat-options">
        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            push(
              "Gestão Financeira",
              "Essa trilha ajuda você a organizar e crescer com segurança 💜"
            )
          }
        >
          💰 Gestão
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            push(
              "Marketing Digital",
              "Aprenda estratégias práticas para vender todos os dias 🚀"
            )
          }
        >
          📣 Marketing
        </Button>

        <Button
          size="sm"
          variant="outline-secondary"
          onClick={() =>
            push(
              "Liderança",
              "Desenvolva autoconfiança, comunicação e liderança ✨"
            )
          }
        >
          🌱 Liderança
        </Button>
      </div>
    );
  }

  // FINAL DA CONVERSA
  if (messages.length > 2) {
    return (
      <div className="chat-options">
        <Button size="sm" variant="outline-dark" onClick={onRestart}>
          🔄 Voltar ao início
        </Button>
      </div>
    );
  }

  return null;
}
