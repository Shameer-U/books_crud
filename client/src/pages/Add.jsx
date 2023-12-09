import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)
  const [image, setImage] = useState()

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e?.target?.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      console.log('file', e.target.files[0])
    } else {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title)
    formData.append('desc', book.desc)
    formData.append('price', book.price)
    formData.append('file', book.cover)

    try {
      await axios.post("http://localhost:8800/books", formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="file"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      {image && <img 
         alt="preview image" 
         src={image} 
         height="100"
         width="100"
      />}
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
