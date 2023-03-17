import React from "react";
import { Link } from "react-router-dom";

import BlogList from "../components/BlogList";

const AdminPage = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Admin</h1>
        <div>
          <Link className="btn btn-success" to="/blogs/write">
            Create New
          </Link>
        </div>
      </div>
      <BlogList isAdmin />
    </div>
  );
};

export default AdminPage;
