import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
  limit
} from "firebase/firestore";
import { db } from "../config/firebase";

// ================= TYPES =================

export type TrackLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface Track {
  title: string;
  level: TrackLevel;
  category: string;
  description: string;
  workload: number;
  bannerUrl: string;
  createdAt?: any;
}

export interface TrackWithId extends Track {
  id: string;
}

// ================= CREATE =================

export async function createTrack(track: Track) {
  const tracksRef = collection(db, "tracks");

  const docRef = await addDoc(tracksRef, {
    ...track,
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

// ================= READ (LIST ALL) =================

export async function getTracks(): Promise<TrackWithId[]> {
  const tracksRef = collection(db, "tracks");
  const q = query(tracksRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Track)
  }));
}

// ================= READ (FEATURED – HOME) =================
// Regra: 3 trilhas mais recentes

export async function getFeaturedTracks(): Promise<TrackWithId[]> {
  const tracksRef = collection(db, "tracks");

  const q = query(
    tracksRef,
    orderBy("createdAt", "desc"),
    limit(3)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Track)
  }));
}

// ================= UPDATE =================

export async function updateTrack(
  id: string,
  data: Partial<Track>
) {
  const trackRef = doc(db, "tracks", id);
  await updateDoc(trackRef, data);
}

// ================= DELETE =================

export async function deleteTrack(id: string) {
  const trackRef = doc(db, "tracks", id);
  await deleteDoc(trackRef);
}
