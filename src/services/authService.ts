/* ======================================================
   Firebase Auth + Firestore
   Responsável por:
   - Cadastro
   - Login
   - Login social
   - Reset de senha
   - Perfil do usuário no Firestore
====================================================== */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  User,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../config/firebase";

/* ======================================================
   Tipagem do perfil do usuário (Firestore)
====================================================== */
export interface UserProfile {
  nomeCompleto: string;
  telefone: string;
  dataNascimento: string;
  email: string;
  createdAt: Date;
}

/* ======================================================
   CADASTRO COM EMAIL E SENHA
   - Cria o usuário no Firebase Auth
   - Salva dados extras no Firestore
====================================================== */
export const registerWithEmail = async (
  email: string,
  password: string,
  profileData: Omit<UserProfile, "createdAt" | "email">
): Promise<User> => {

  // 1️⃣ Cria o usuário no Auth
  const result = await createUserWithEmailAndPassword(auth, email, password);

  const user = result.user;
  const uid = user.uid;

  // 2️⃣ Salva os dados extras no Firestore
  await setDoc(doc(db, "users", uid), {
    ...profileData,
    email,
    createdAt: new Date(),
  });

  // 3️⃣ Retorna o usuário autenticado
  return user;
};

/* ======================================================
   LOGIN COM EMAIL E SENHA
   - Apenas autenticação
====================================================== */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<User> => {

  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

/* ======================================================
   BUSCAR PERFIL DO USUÁRIO (Firestore)
   - Usado após login
====================================================== */
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {

  const userDoc = await getDoc(doc(db, "users", uid));

  if (!userDoc.exists()) return null;

  return userDoc.data() as UserProfile;
};

/* ======================================================
   LOGIN COM GOOGLE
   - Cria perfil no Firestore se não existir
====================================================== */
export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Se for o primeiro login, cria o perfil
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        nomeCompleto: user.displayName ?? "",
        telefone: "",
        dataNascimento: "",
        email: user.email,
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Erro no login com Google:", error);
    return null;
  }
};

/* ======================================================
   LOGIN COM FACEBOOK
   - Cria perfil no Firestore se não existir
====================================================== */
export const loginWithFacebook = async (): Promise<User | null> => {
  try {
    const provider = new FacebookAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        nomeCompleto: user.displayName ?? "",
        telefone: "",
        dataNascimento: "",
        email: user.email,
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Erro no login com Facebook:", error);
    return null;
  }
};

/* ======================================================
   LOGIN VIA REDIRECT (caso use redirect)
====================================================== */
export const getSocialRedirectResult = async (): Promise<User | null> => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user ?? null;
  } catch (error) {
    console.error("Erro ao obter resultado do redirect:", error);
    return null;
  }
};

/* ======================================================
   RESET DE SENHA
====================================================== */
export const resetPassword = async (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

/* ======================================================
   VERIFICA CÓDIGO DE RESET
====================================================== */
export const verifyResetCode = async (code: string) => {
  return verifyPasswordResetCode(auth, code);
};

/* ======================================================
   CONFIRMA NOVA SENHA
====================================================== */
export const confirmNewPassword = async (
  code: string,
  newPassword: string
) => {
  return confirmPasswordReset(auth, code, newPassword);
};