import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { create } from "zustand";
import { auth, googleProvider } from "../firebase/config";
import { toast } from "sonner";
import { saveUserIfNotExists } from "../lib/firestoreHelpers";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Action functions
  checkAuthStatus: () => () => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;

  // fucntion to update states
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  // function to update states
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Action functions
  checkAuthStatus: () => {
    set({ loading: true, error: null });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, loading: false, error: null });
      } else {
        set({ user: null, loading: false, error: null });
      }
    });
    return unsubscribe;
  },

  login: async () => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserIfNotExists(user);
      set({ user, loading: false });
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      let errorMessage = "Failed to sign in with Google.";
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup closed. Please try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      set({ user: null, loading: false, error: errorMessage });
      toast.error(`Login Error: ${errorMessage}`);
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (err: any) {
      console.error("Error logging out:", err);
      set({ loading: false, error: err.message || "Failed to logout." });
      toast.error(`Logout Error: ${err.message || "Unknown error"}`);
    }
  },
}));

export default useAuthStore;
