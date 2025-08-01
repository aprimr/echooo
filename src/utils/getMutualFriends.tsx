import { DocumentData, Timestamp } from "firebase/firestore";

type UserDetails = {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  keywords: string[];
  createdAt: Timestamp;
  friends: string[];
  sentRequests: string[];
  receivedRequests: string[];
  requestedOn: Timestamp;
};

function getMutualFriends(
  userA: DocumentData | UserDetails | null,
  userB: DocumentData | UserDetails | null
): string[] {
  if (userA === null || userB === null) return [];
  const setB = new Set(userB.friends);
  return userA.friends.filter((friendId: string) => setB.has(friendId));
}

export default getMutualFriends;
