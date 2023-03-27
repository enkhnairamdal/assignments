import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CategoriesSelector } from "./CategoriesSelector";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
export function CkEditor() {
  const [content, setContent] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  // const [articleImg, setImg] = useState("");
  let [image, setImage] = useState("");
  // let [coverPhoto, setCoverPhoto] = useState("");

  async function handleFileUpload(event) {
    const imageFile = event.target.files[0];
    console.log(imageFile);
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(formData);
    await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      });
  }
  function submit() {
    console.log({ content, categoryId });

    axios
      .post("http://localhost:8000/articles", {
        title, // title: title,
        categoryId, //  categoryId: categoryId,
        content, // text: text,
        image,
        name,
      })
      .then((res) => {
        const { status } = res;
        if (status === 201) {
          alert("Success");
        }
      });
  }
  return (
    <>
      <div className="col-6 mx-auto my-5">
        <h1 className="mb-4">Шинэ мэдээ</h1>
        <div>
          <CategoriesSelector
            value={categoryId}
            onChange={(val) => setCategoryId(val)}
          />
          <input
            className="form-control mt-4 mb-4"
            value={name}
            placeholder="ovog ner"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <input
          id="title"
          className="form-control mt-4 mb-4"
          placeholder="Мэдээний гарчиг"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <input
          placeholder="zurag url"
          type="url"
          value={coverPhoto}
          onChange={coverPhoto}
        /> */}
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <div>
          {/* <img
            src={coverPhoto}
            style={{ width: "248px", height: "198px", objectFit: "cover" }}
          /> */}
          <input type="file" name="image" onChange={handleFileUpload} />
        </div>
        <button onClick={submit}>Хадгалах</button>
      </div>
    </>
  );
}
