import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({});

import { login as loginFirebase } from "@/firebase";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const toast = useToast();

  const router = useRouter();

  const login = async (username, password) => {
    const result = await loginFirebase(username, password);
    toast({
      title: result.message,
      status: result.status,
      duration: 2000,
    });
    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      router.push("/");
    }
  };

  const logout = () => {
    setUsername("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
