import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="page-not-found-wrapper">
      <h3 id="title_404">Oops :(</h3>
      <h5 id="description_404">
        This page does not exist. Click here to return to{" "}
        <Link href="/">homepage</Link>.
      </h5>
    </div>
  );
};

export default NotFound;
