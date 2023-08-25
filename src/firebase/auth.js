import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./config";
import { message } from "@/utils";
import { create, readOne } from "./crud";
import { collection, getDocs, query, where } from "firebase/firestore";

export const signUp = async (email, password, opm) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    create("users", {
      idUser: user.uid,
      email,
      opm,
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
