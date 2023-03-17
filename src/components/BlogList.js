import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const onClickCard = useCallback(
    (id) => () => {
      navigate(`/blogs/${id}`);
    },
    [navigate]
  );
  const onClickDelete = useCallback(
    (id) => (e) => {
      e.stopPropagation();
      axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
        setPosts((prevState) => prevState.filter((post) => post.id !== id));
      });
    },
    []
  );

  const fetchPosts = (page) => {
    axios
      .get(`http://localhost:3001/posts`, {
        params: {
          _page: page,
          _limit: 5,
          _sort: "id",
          _order: "desc",
        },
      })
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const publicPosts = posts.filter((post) => isAdmin || !post.isPrivate);

  if (publicPosts.length === 0) {
    return <div>No blog posts found</div>;
  }

  return (
    <div>
      {publicPosts.map((post) => (
        <Card key={post.id} title={post.title} onClick={onClickCard(post.id)}>
          {isAdmin ? (
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={onClickDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </Card>
      ))}
      <Pagination />
    </div>
  );
};

BlogList.propTypes = {
  isAdmin: PropTypes.bool,
};

BlogList.defaultProps = {
  isAdmin: false,
};

export default BlogList;
