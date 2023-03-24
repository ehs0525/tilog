import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import useToast from "../hooks/useToast";
import { backUrl } from "../config/config";

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { addToast, deleteToast } = useToast();

  useEffect(() => {
    fetchPost(id);
  }, [id]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchPost = (id) => {
    axios
      .get(`${backUrl}/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong in database");
        const toastId = uuidv4();
        addToast(
          {
            type: "danger",
            text: "Something went wrong in database",
          },
          toastId
        );
        setTimeout(() => {
          deleteToast(toastId)();
        }, 5000);
        setIsLoading(false);
      });
  };

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">
          {post.title}({timer}초)
        </h1>
        {isLoggedIn && (
          <div>
            <Link className="btn btn-primary" to={`/blogs/${id}/edit`}>
              Edit
            </Link>
          </div>
        )}
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
