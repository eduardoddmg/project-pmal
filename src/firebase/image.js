import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const uploadImage = (storageRef, selectedFile) => {
  return uploadBytes(storageRef, selectedFile).then((snapshot) => {
    return true;
  });
};

export const getImage = (imagesRef, selectedFile) => {
    return listAll(imagesRef)
      .then((res) => {
        console.log("List of items:", res.items);
  
        const item = res.items.find(
          (i) => i._location.path_ == selectedFile.name
        );
  
        if (!item) {
          console.log("Item not found.");
          return null; // or handle the case when the item is not found
        }
  
        const currentItem = item._location.path_;
  
        if (currentItem === selectedFile.name) {
          console.log("Item found:", item);
          return getDownloadURL(item).then((url) => {
            console.log("Download URL:", url);
            return url;
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };