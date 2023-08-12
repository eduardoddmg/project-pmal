import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export const useSearch = (array, collectionName, field) => {
  const searchFirebase = async (data) => {
    console.log(data);
    console.log(collectionName, field);
    const q = query(
      collection(db, collectionName),
      where(field, "==", data.searchQuery)
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => doc.data());

    console.log(results);

    return results;
  };

  const searchField = (input) => {
    console.log(input);
    const result = array.filter((item) => {
      const values = Object.values(item);
      console.log(values);
      return values.some((value) =>
        String(value).toLowerCase().includes(input.toLowerCase())
      );
    });
    console.log(result);
    return result;
  };

  return {
    searchFirebase,
    searchField,
  };
};
