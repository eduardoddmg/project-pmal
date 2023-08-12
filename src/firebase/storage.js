import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const uploadImage = async (storageRef, selectedFile) => {
    try {
      // Faz o upload do arquivo para o storage
      const snapshot = await uploadBytes(storageRef, selectedFile);
  
      // Obtém a URL da imagem carregada
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      return downloadURL;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return null; // Retorna nulo em caso de erro
    }
  };

export const getImage = (imagesRef, selectedFile) => {
  return listAll(imagesRef)
    .then((res) => {
      const item = res.items.find(
        (i) => i._location.path_ == selectedFile.name
      );

      const currentItem = item._location.path_;

      if (currentItem === selectedFile.name)
        return getDownloadURL(item).then((url) => {
          return url;
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
