import { db } from "../firebase/config";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

type UserSearchResult = {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  keywords: string[];
  createdAt: Timestamp;
  friends: string[];
  sentRequests: string[];
  receivedRequests: string[];
};

export async function searchFriends(name: string): Promise<UserSearchResult[]> {
  // search query
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", name.toLowerCase())
  );

  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserSearchResult[];

  return results;
}

export async function sendFriendRequest(fromId: string, toId: string) {
  if (fromId === toId) return;

  const fromRef = doc(db, "users", fromId);
  const toRef = doc(db, "users", toId);

  updateDoc(fromRef, {
    sentRequests: arrayUnion({ to: toId, at: Date.now() }),
  });

  updateDoc(toRef, {
    receivedRequests: arrayUnion({ from: fromId, at: Date.now() }),
  });
}
