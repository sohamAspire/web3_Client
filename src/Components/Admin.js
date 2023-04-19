import React from "react";
import { MDBRipple, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-4 container-fluid p-0 m-0 m-4">
        <MDBListGroup sticky="true">
          <MDBRipple rippleTag="span">
            <NavLink to="/admin/blogs" className="text-light">
              <MDBListGroupItem
                action
                className="border-0 border-bottom rounded rounded bg-primary text-light"
              >
                Blogs
              </MDBListGroupItem>
            </NavLink>
          </MDBRipple>

          <MDBRipple rippleTag="span">
            <NavLink to="/admin/users" className="text-light">
              <MDBListGroupItem
                action
                className="border-0 border-bottom rounded bg-primary text-light"
                aria-current="true"
              >
                Users
              </MDBListGroupItem>
            </NavLink>
          </MDBRipple>
        </MDBListGroup>
      </div>
      <div className="col-11 col-md-8 col-sm-8 m-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
