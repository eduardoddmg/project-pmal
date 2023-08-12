import { formatDate, parseSecondsToDate } from "@/utils";
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
} from "firebase/firestore";

export const readAll = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataArray = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    data.updatedAt = parseSecondsToDate(data.updatedAt.seconds);
    return data;
  });
  console.log(dataArray);
  return dataArray;
};

export const readOne = async (collectionName, documentId) => {

  console.log(collectionName, documentId);

  const documentRef = doc(db, collectionName, documentId);
  const docSnapshot = await getDoc(documentRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    console.log(data);
    return data;
  } else {
    console.log("Documento não encontrado!");
  }
};

export const create = async (collectionName, newData) => {
  try {
    newData.creaetdAt = serverTimestamp();
    newData.updatedAt = serverTimestamp();

    console.log(db);
    const docRef = await addDoc(collection(db, collectionName), newData);
  } catch (error) {
    console.error("Erro ao criar documento:", error);
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
    await updateDoc(doc(db, collectionName, documentId), newData);
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
  }
};
