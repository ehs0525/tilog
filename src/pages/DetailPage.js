import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/LoadingSpinner";

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const fetchPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost(res.data);
      setIsLoading(false);
    });
  };

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post.title}</h1>
        <div>
          <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
            Edit
          </Link>
        </div>
      </div>
      <small className="text-muted">
        Created At: {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.content}</p>
    </div>
  );
};

export default DetailPage;
