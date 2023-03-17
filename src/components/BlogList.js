import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "./Pagination";

const BlogList = ({ isAdmin }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const limit = 1;
  const pageParam = new URLSearchParams(location.search).get("page");

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts / limit));
  }, [numberOfPosts]);
  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    fetchPosts(parseInt(pageParam) || 1);
  }, [pageParam]);

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
  const onClickPagination = useCallback(
    (page) => {
      navigate(`${location.pathname}?page=${page}`);
      fetchPosts(page);
    },
    [navigate]
  );

  const fetchPosts = (page) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: "id",
      _order: "desc",
    };
    if (!isAdmin) {
      params = { ...params, isPrivate: false };
    }

    axios
      .get(`http://localhost:3001/posts`, {
        params,
      })
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
        setNumberOfPosts(res.headers["x-total-count"]);
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
          {isAdmin && (
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={onClickDelete(post.id)}
              >
                Delete
              </button>
            </div>
          )}
        </Card>
      ))}
      {numberOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={onClickPagination}
        />
      )}
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
