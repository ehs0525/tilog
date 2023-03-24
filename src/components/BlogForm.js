import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import useToast from "../hooks/useToast";
import LoadingSpinner from "./LoadingSpinner";
import { backUrl } from "../config/config";

const BlogForm = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [originalIsPrivate, setOriginalIsPrivate] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { addToast, deleteToast } = useToast();

  useEffect(() => {
    if (editing) {
      axios
        .get(`${backUrl}/posts/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setOriginalTitle(res.data.title);
          setContent(res.data.content);
          setOriginalContent(res.data.content);
          setIsPrivate(res.data.isPrivate);
          setOriginalIsPrivate(res.data.isPrivate);
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
    } else {
      setIsLoading(false);
    }
  }, [editing, id]);

  const validateForm = useCallback(() => {
    let isValid = true;

    if (title.length === 0) {
      setTitleError(true);
      isValid = false;
    }
    if (content.length === 0) {
      setContentError(true);
      isValid = false;
    }

    return isValid;
  }, [title.length, content.length]);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  const onChangePrivate = useCallback((e) => {
    setIsPrivate(e.target.checked);
  }, []);
  const onSubmit = useCallback(() => {
    setTitleError(false);
    setContentError(false);
    if (validateForm()) {
      if (editing) {
        axios
          .patch(`${backUrl}/posts/${id}`, {
            title,
            content,
            isPrivate,
          })
          .then(() => {
            navigate(`/blogs/${id}`);
          })
          .catch((err) => {
            setError("Cannot update blog");
            const toastId = uuidv4();
            addToast(
              {
                type: "danger",
                text: "Cannot update blog",
              },
              toastId
            );
            setTimeout(() => {
              deleteToast(toastId)();
            }, 5000);
          });
      } else {
        axios
          .post(`${backUrl}/posts`, {
            title,
            content,
            isPrivate,
            createdAt: Date.now(),
          })
          .then(() => {
            const id = uuidv4();
            addToast(
              {
                type: "success",
                text: "Successfully created!",
              },
              id
            );
            setTimeout(() => deleteToast(id)(), 5000);
            navigate("/admin");
          })
          .catch((err) => {
            setError("Cannot create new blog");
            const toastId = uuidv4();
            addToast(
              {
                type: "danger",
                text: "Cannot create new blog",
              },
              toastId
            );
            setTimeout(() => {
              deleteToast(toastId)();
            }, 5000);
          });
      }
    }
  }, [validateForm, editing, id, title, content, isPrivate, navigate]);
  const onClickCancel = useCallback(() => {
    if (editing) {
      navigate(`/blogs/${id}`);
    } else {
      navigate("/admin");
    }
  }, [editing, navigate, id]);

  const isEdited = () =>
    title !== originalTitle ||
    content !== originalContent ||
    isPrivate !== originalIsPrivate;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className={`form-control ${titleError && "border-danger"}`}
          value={title}
          onChange={onChangeTitle}
        />
        {titleError && <div className="text-danger">Title is required.</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className={`form-control ${contentError && "border-danger"}`}
          rows={10}
          value={content}
          onChange={onChangeContent}
        />
        {contentError && (
          <div className="text-danger">Content is required.</div>
        )}
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isPrivate}
          onChange={onChangePrivate}
        />
        <label className="form-check-label">Private</label>
      </div>
      <button
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? "Edit" : "Post"}
      </button>
      <button className="btn btn-danger ms-2" onClick={onClickCancel}>
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: PropTypes.bool,
};

BlogForm.defaultProps = {
  editing: false,
};

export default BlogForm;
