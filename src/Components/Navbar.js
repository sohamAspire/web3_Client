import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Styles.css";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";
const Navbar = (props) => {
  // console.log(props);
  const [showNavColor, setShowNavColor] = useState(false);
  return (
    <>
      <MDBNavbar
        expand="lg"
        sticky
        light
        className="p-0 bg-primary bg-gradient text-white"
      >
        <MDBContainer fluid className="m-0 p-0">
          <MDBNavbarToggler
            type="button"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className="mb-2 mb-lg-0">
                <>
                  <MDBNavbarItem className="p-2 mx-2">
                    <NavLink to="/" className="text-white">
                      <i className="fas fa-house-chimney-user fs-6 mx-2"></i>
                      Home
                    </NavLink>
                  </MDBNavbarItem>
                </>
              {props.status.isLoged ? (
                <MDBNavbarItem className="p-2 mx-2">
                  <NavLink to="/blogs" className="text-white">
                    <i className="fas fa-blog fs-6 mx-2"></i> My Blogs
                  </NavLink>
                </MDBNavbarItem>
              ) : null}

              {props.status.status || props.status.isLoged ? null : (
                <MDBNavbarItem className="p-2 mx-2">
                  <NavLink to="/signup" className="text-white">
                    <i className="fas fa-user-plus fs-6 mx-2 mb-2"></i>Register
                  </NavLink>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
          {props.status.isLoged ? (
            <>
              <span className="p-3 text-white fs-6">
                <i className="far fa-circle-user mx-2 fs-6"></i>
                {props.status.user.firstName}
              </span>
              <button
                className="btn btn-danger mx-2 text-white"
                onClick={props.status.logOut}
              >
                <i className="fas fa-arrow-right-from-bracket fs-6 mx-2"></i> Logout
              </button>
            </>
          ) : (
            <NavLink className="p-2 m-2 text-white" to="/login">
              <i className="fas fa-right-to-bracket mx-2 fs-6"></i>
              Login
            </NavLink>
          )}
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
