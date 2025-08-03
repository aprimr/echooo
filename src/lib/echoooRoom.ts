import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";

export interface SendMessageProps {
  message: string;
  userId: string;
  userName: string;
  userImage: string;
  replyToMessageId?: string | null;
}

export async function sendMessage({
  message,
  userId,
  userName,
  userImage,
  replyToMessageId = null,
}: SendMessageProps) {
  if (!userId || !message.trim()) return;

  try {
    await addDoc(collection(db, "echoooroom"), {
      message,
      userId,
      userName,
      userImage,
      createdAt: serverTimestamp(),
      editedAt: null,
      deletedAt: null,
      replyToMessageId,
      reactions: [],
    });
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}

export function getMessages(
  onMessagesReceived: (messages: DocumentData[]) => void
) {
  const messagesQuery = query(
    collection(db, "echoooroom"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt
            : new Timestamp(0, 0),
      };
    });

    onMessagesReceived(messages);
  });

  return unsubscribe;
}
