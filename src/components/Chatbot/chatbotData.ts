export type ChatOption = {
  label: string;
  next: string;
};

export type ChatStep = {
  message: string;
  options: ChatOption[];
};

export const chatbotFlow: Record<string, ChatStep> = {
  start: {
    message: "Olá! 👋 Sou o assistente do projeto. Como posso te ajudar?",
    options: [
      { label: "Conhecer o projeto", next: "about" },
      { label: "Funcionalidades", next: "features" },
      { label: "Como usar", next: "usage" }
    ]
  },

  about: {
    message:
      "Este é um projeto desenvolvido em React com foco em experiência do usuário e organização de código.",
    options: [{ label: "⬅ Voltar", next: "start" }]
  },

  features: {
    message:
      "✨ Funcionalidades principais:\n• Chatbot guiado\n• Interface moderna\n• Código modular\n• Fácil evolução para IA",
    options: [{ label: "⬅ Voltar", next: "start" }]
  },

  usage: {
    message:
      "Você pode interagir com o chatbot clicando nas opções. Ele foi pensado para guiar o usuário de forma simples.",
    options: [{ label: "⬅ Voltar", next: "start" }]
  }
};
