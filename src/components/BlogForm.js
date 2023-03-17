import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const BlogForm = ({ editing }) => {
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [originalIsPrivate, setOriginalIsPrivate] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setContent(res.data.content);
        setOriginalContent(res.data.content);
        setIsPrivate(res.data.isPrivate);
        setOriginalIsPrivate(res.data.isPrivate);
      });
    }
  }, [editing, id]);

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
    if (editing) {
      axios
        .patch(`http://localhost:3001/posts/${id}`, {
          title,
          content,
          isPrivate,
        })
        .then(() => {
          navigate(`/blogs/${id}`);
        });
    } else {
      axios
        .post("http://localhost:3001/posts", {
          title,
          content,
          isPrivate,
          createdAt: Date.now(),
        })
        .then(() => {
          navigate("/admin");
        });
    }
  }, [editing, id, title, content, isPrivate, navigate]);
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

  return (
    <div>
      <h1>{editing ? "Edit" : "Create"} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={onChangeTitle}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content</label>
        <textarea
          className="form-control"
          rows={10}
          value={content}
          onChange={onChangeContent}
        />
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
