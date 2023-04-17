import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const ImageUpload = () => {
  const image = '1681719500041.png'
  const [state, setState] = useState(null);
  const onFileChange = () => {
    const Image = ref(
      storage,
      `images/${Date.now().toString() + "." + state.name.split(".")[1]}`
    );
    uploadBytes(Image, state).then((res) => {
      alert("Image Uploaded");
    });
  };

  return (
    <>
      <div>
        <img src={`https://firebasestorage.googleapis.com/v0/b/blogsite-381509.appspot.com/o/images%2F${image}?alt=media&token=96b1b789-e501-4346-9b09-15ad36dd0847`} alt="boy" />
        <h1 className="h1">Image Upload</h1>
        <input type="file" onChange={(e) => setState(e.target.files[0])} />
        <button onClick={onFileChange}>Upload!</button>
      </div>
    </>
  );
};

export default ImageUpload;
