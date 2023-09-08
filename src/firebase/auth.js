import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./config";
import { message } from "@/utils";
import { create, readOne } from "./crud";
import { collection, getDocs, query, where } from "firebase/firestore";

export const signUp = async (data) => {
  try {
    const { email, password, opm, comandos, role } = data;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const result = await create("users", {
      idUser: user.uid,
      email,
      opm: role === "Comando" ? null : opm,
      comandos: role === "OPM" ? null : comandos,
      role,
    });

    if (!result.success) return result;

    return {
      success: true,
      message: message.success.accountCreated,
      status: "success",
    };
  } catch (error) {
    const errorCode = error.code;

    console.log(error);

    return {
      success: false,
      message: message.error[errorCode],
      status: "error",
    };
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const q = query(collection(db, "users"), where("idUser", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data())[0];
    console.log(result);
    return {
      success: true,
      username: user.displayName,
      token: user.uid,
      message: message.success.accountLoggedIn,
      status: "success",
      opm: result.opm,
      comando: result.comandos,
      admin: result.admin || false,
    };
  } catch (error) {
    const errorCode = error.code;

    return {
      success: false,
      message: message.error[errorCode],
      status: "error",
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      status: "success",
      message: "Mensagem enviada para seu email",
    };
  } catch (error) {
    const errorCode = error.code;

    return {
      success: false,
      message: message.error[errorCode],
      status: "error",
    };
  }
};

export const getUserByToken = async (token) => {
  try {
    const q = query(collection(db, "users"), where("idUser", "==", token));
    const querySnapshot = await getDocs(q);
    const result = querySnapshot.docs.map((doc) => doc.data())[0];
    return {
      success: true,
      token,
      message: "Bem-vindo de volta",
      status: "success",
      opm: result.opm,
      comando: result.comandos,
      admin: result.admin || false,
    };
  } catch (error) {
    const errorCode = error.code;

    return {
      success: false,
      message: message.error[errorCode],
      status: "error",
    };
  }
};

export const removeUserByEmail = async (email) => {
  try {
    // Use a consulta para buscar um usuário pelo email
    const users = await listUsers(auth, {
      email: email,
    });

    if (users.users.length > 0) {

      await deleteUser(auth, users.users[0].uid);
      console.log(`Usuário com o email ${email} excluído com sucesso.`);
    } else {
      console.log(`Usuário com o email ${email} não encontrado.`);
    }
  } catch (error) {
    console.error("Erro ao excluir o usuário por email:", error);
  }
};
