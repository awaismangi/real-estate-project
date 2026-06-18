import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Seeded default account. Username: admin, Password: admin, Role: admin.
// Any account created through the Sign Up form is given the "user" role.
const seedUsers = [
  {
    name: "Admin",
    email: "admin",
    password: "admin",
    role: "admin",
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  const clearError = () => setError("");

  const signIn = ({ email, password }) => {
    clearError();
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
    if (!match) {
      setError("Incorrect email/username or password.");
      return false;
    }
    setCurrentUser(match);
    return true;
  };

  const signUp = ({ name, email, password }) => {
    clearError();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in every field.");
      return false;
    }
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) {
      setError("An account with that email already exists.");
      return false;
    }
    const newUser = { name: name.trim(), email: email.trim(), password, role: "user" };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, signIn, signUp, signOut, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
