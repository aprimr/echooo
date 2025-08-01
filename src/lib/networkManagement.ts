import { db } from "../firebase/config";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDoc,
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

export async function cancelFriendRequest(fromId: string, toId: string) {
  const fromRef = doc(db, "users", fromId);
  const toRef = doc(db, "users", toId);

  const [fromSnap, toSnap] = await Promise.all([
    getDoc(fromRef),
    getDoc(toRef),
  ]);

  if (!fromSnap.exists() || !toSnap.exists()) return;

  const fromData = fromSnap.data();
  const toData = toSnap.data();

  const sentRequest = fromData.sentRequests?.find(
    (r: DocumentData) => r.to === toId
  );
  const receivedRequest = toData.receivedRequests?.find(
    (r: DocumentData) => r.from === fromId
  );

  if (!sentRequest || !receivedRequest) return;

  await Promise.all([
    updateDoc(fromRef, {
      sentRequests: arrayRemove(sentRequest),
    }),
    updateDoc(toRef, {
      receivedRequests: arrayRemove(receivedRequest),
    }),
  ]);
}

export async function acceptFriendRequest(fromId: string, toId: string) {
  const fromRef = doc(db, "users", fromId);
  const toRef = doc(db, "users", toId);

  const [fromSnap, toSnap] = await Promise.all([
    getDoc(fromRef),
    getDoc(toRef),
  ]);
  if (!fromSnap.exists() || !toSnap.exists()) return;

  const fromData = fromSnap.data();
  const toData = toSnap.data();

  const updatedSentRequests = (fromData.sentRequests || []).filter(
    (r: DocumentData) => r.to !== toId
  );

  const updatedReceivedRequests = (toData.receivedRequests || []).filter(
    (r: DocumentData) => r.from !== fromId
  );

  await Promise.all([
    updateDoc(fromRef, {
      friends: arrayUnion(toId),
      sentRequests: updatedSentRequests,
    }),
    updateDoc(toRef, {
      friends: arrayUnion(fromId),
      receivedRequests: updatedReceivedRequests,
    }),
  ]);
}

export async function unfriend(fromId: string, toId: string) {
  const fromRef = doc(db, "users", fromId);
  const toRef = doc(db, "users", toId);

  const [fromSnap, toSnap] = await Promise.all([
    getDoc(fromRef),
    getDoc(toRef),
  ]);

  if (!fromSnap.exists() || !toSnap.exists()) return;

  const fromData = fromSnap.data();
  const toData = toSnap.data();

  const updatedFriends = (fromData.friends || []).filter(
    (f: string) => f !== toId
  );

  await Promise.all([
    updateDoc(fromRef, {
      friends: updatedFriends,
    }),
    updateDoc(toRef, {
      friends: (toData.friends || []).filter((f: string) => f !== fromId),
    }),
  ]);
}
