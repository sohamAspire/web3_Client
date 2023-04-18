import React from "react";
import { NavLink } from "react-router-dom";
import { MDBFooter } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <>
      <MDBFooter
        bgColor="primary"
        className="text-center text-lg-left mt-4 fixed-bottom"
        expand="lg"
      >
        <div
          className="text-center text-light p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; {new Date().getFullYear()} Copyright: &nbsp;
          <NavLink className="text-light" to="/">
            Aspire
          </NavLink>
        </div>
      </MDBFooter>
    </>
  );
};

export default Footer;
