export * from "./auth";

import { AuthProvider } from "./auth";

export const ContextProvider = ({ children }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};
