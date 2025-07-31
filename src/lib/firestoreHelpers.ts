import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { User } from "firebase/auth";

export async function saveUserIfNotExists(user: User) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Unknown",
      email: user.email || "",
      friends: <string[]>[],
      sentRequests: <string[]>[],
      receivedRequests: <string[]>[],
      photoURL: user.photoURL || "",
      keywords: generateKeywords(user.displayName || ""),
      createdAt: new Date(),
    });
  }
}

function generateKeywords(name: string): string[] {
  const terms = name.toLowerCase().split(" ");
  const keywords = new Set<string>();

  for (const term of terms) {
    // Add individual term and all prefixes
    let current = "";
    for (const char of term) {
      current += char;
      keywords.add(current);
    }
  }

  // Add full combinations and their prefixes
  for (let i = 0; i < terms.length; i++) {
    for (let j = 0; j < terms.length; j++) {
      if (i !== j) {
        const combo = `${terms[i]} ${terms[j]}`;
        let current = "";
        for (const char of combo) {
          current += char;
          keywords.add(current.trim());
        }
      }
    }
  }

  return Array.from(keywords);
}
