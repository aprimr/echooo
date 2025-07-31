import { db } from "../firebase/config";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function searchFriends(name: string) {
  // search query
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", name.toLowerCase())
  );

  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

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
