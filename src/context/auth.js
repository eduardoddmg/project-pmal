import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext({});

import { getUserByToken, login as loginFirebase } from "@/firebase";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [opm, setOpm] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const storageToken = localStorage.getItem("token");
    console.log(storageToken);
    if (storageToken) relogin(storageToken);

    else  setLoading(false)
  }, []);

  const relogin = async (storageToken) => {
    const result = await getUserByToken(storageToken);

    if (result.success) {
      setOpm(result.opm);
      setAdmin(result.admin);
      setToken(result.token);
    } else logout();
    setLoading(false);
  };

  const login = async (username, password, remember) => {
    const result = await loginFirebase(username, password);
    toast({
      title: result.message,
      status: result.status,
      duration: 2000,
    });

    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      setOpm(result.opm);

      if (remember) localStorage.setItem("token", result.token);

      if (result.admin) setAdmin(true);
      else setAdmin(false);
      router.push("/");
    }
  };

  const logout = () => {
    setUsername("");
    setToken("");
    setOpm("");
    setAdmin(false);

    localStorage.setItem("token", "");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        opm,
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
