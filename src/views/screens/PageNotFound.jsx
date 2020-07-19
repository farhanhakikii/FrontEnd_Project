import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="container mt-5 text-center">
        <h1>Error 404</h1>
        <h1>Page Not Found</h1>
        <Link to="/">Return Home</Link>
      </div>
    );
  }
}

export default PageNotFound;
