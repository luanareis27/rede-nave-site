import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface Evento {
  titulo: string;
  tipo: string;
  modalidade: string;
  data: string;
  horario: string;
  vagas: number;
  localOuLink: string;
  status: string;
  palestrante: string;
  cargo: string;
}

export const salvarEvento = async (evento: Evento) => {
  try {
    // Cria a collection "eventos" no Firestore
    const docRef = await addDoc(collection(db, "eventos"), evento);
    console.log("Evento cadastrado com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao cadastrar evento:", error);
  }
};
export const excluirEvento = async (id: string) => {
  return deleteDoc(doc(db, "eventos", id));
};

export const editarEvento = async (id: string, dadosAtualizados: any) => {
  return updateDoc(doc(db, "eventos", id), dadosAtualizados);
};