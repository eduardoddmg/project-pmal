import { formatDate, message, parseSecondsToDate } from "@/utils";
import { db } from "./config";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export const readAll = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataArray = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.updatedAt = data.updatedAt ? parseSecondsToDate(data.updatedAt.seconds) : null;
    return data;
  });
  console.log(dataArray);
  return dataArray;
};

export const readByField = async (collectionName, field, value) => {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const qSnapshot = await getDocs(q);
  const dataArray = qSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.updatedAt = data.updatedAt ? parseSecondsToDate(data.updatedAt.seconds) : null;
    return data;
  }) || null;
  console.log(dataArray);
  return dataArray[0] || null;
}

export const readOne = async (collectionName, documentId) => {
  console.log(collectionName, documentId);

  const documentRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(documentRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    console.log(data);
    return data;
  } else {
    return null;
  }
};

export const create = async (collectionName, newData) => {
  try {
    newData.creaetdAt = serverTimestamp();
    newData.updatedAt = serverTimestamp();

    console.log(newData);

    const docRef = await addDoc(collection(db, collectionName), newData);

    return {
      success: true,
      message: "Documento criado com sucesso",
      status: "success",
      docRef,
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

export const remove = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Documento excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir documento:", error);
  }
};

export const update = async (collectionName, documentId, newData) => {
  try {
    newData.updatedAt = serverTimestamp();
    console.log(newData);
    await updateDoc(doc(db, collectionName, documentId), newData);
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
  }
};
