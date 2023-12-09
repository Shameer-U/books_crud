import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error,setError] = useState(false)
  const [image, setImage] = useState()

  const location = useLocation();
  const urlParams = useParams();
  const navigate = useNavigate();

  const bookId = urlParams.id;

  useEffect(() => {
    const getBookDetails = async () => {
      const response =  await axios.get(`http://localhost:8800/books/${bookId}`);
      
      const bookDetails = response?.data?.[0];
      setBook({
        title: bookDetails?.title,
        desc: bookDetails?.desc,
        price: bookDetails?.price,
        cover: bookDetails?.cover
      })
    }

    getBookDetails();
  }, [])

  const handleChange = (e) => {
    if (e?.target?.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  console.log('book', book)

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title)
    formData.append('desc', book.desc)
    formData.append('price', book.price)
    formData.append('file', book.cover)

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={(e) => handleChange(e)}
        value={book?.title}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
        value={book?.desc}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
        value={book?.price}
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

      <button onClick={handleClick}>Update</button>

      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
