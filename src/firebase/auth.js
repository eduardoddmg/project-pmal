import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";
import { message } from "@/utils";
import { create } from "./crud";

export const signUp = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });
    create("users", {
      idUser: user.uid,
      name: username,
      address: null,
      age: null,
      imgUrl: null
    });

    console.log("Usuário registrado com sucesso:", user.uid);

    return {
      success: true,
      message: message.success.accountCreated,
      status: "success",
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

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return {
      success: true,
      username: user.displayName,
      token: user.uid,
      message: message.success.accountLoggedIn,
      status: "success",
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
