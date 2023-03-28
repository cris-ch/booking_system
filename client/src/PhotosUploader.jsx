import React, { useState } from "react";
import axios from "axios";
import { MdFileUpload } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function AddPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-url", {
      url: photoLink,
    });
    onChange([...addedPhotos, filename]);
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange([...addedPhotos, ...filenames]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deletePhoto(filename, e) {
    e.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add photo using a link"
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={AddPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => (
            <div key={index} className="h-32 flex relative">
              <img
                className="rounded-2xl w-full object-cover position-center"
                src={`http://localhost:4000/uploads/${photo}`}
              />
              <button onClick={(e) => deletePhoto(photo, e)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-2">
                <FaRegTrashAlt />
              </button>
            </div>
          ))}
        <label className="h-32 flex cursor-pointer justify-center gap-1 border bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <MdFileUpload className="mt-1.5" />
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
