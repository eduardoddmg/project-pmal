import { useRouter } from "next/router";
import { useState } from "react";

export const UseImage = (key) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState("");
  const [previewImage, setPreviewImage] = useState(
    router.query[key] ||
      "https://demos.creative-tim.com/vue-white-dashboard-pro/img/image_placeholder.jpg"
  );

  console.log(router.query[key]);

  return { selectedFile, setSelectedFile, previewImage, setPreviewImage };
};
