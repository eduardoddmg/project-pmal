import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({});

import { login as loginFirebase } from "@/firebase";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [opm, setOpm] = useState("");
  const [admin, setAdmin] = useState(false);

  const toast = useToast();

  const router = useRouter();

  const login = async (username, password) => {
    const result = await loginFirebase(username, password);
    toast({
      title: result.message,
        status: result.status,
      duration: 2000,
    });

    console.log(result);

    if (result.success) {
      setUsername(result.username);
      setToken(result.token);
      setOpm(result.opm);


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
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        login,
        logout,
        opm,
        admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
