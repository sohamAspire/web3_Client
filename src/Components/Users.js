/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginator from "./Paginator";
import { useDispatch } from "react-redux";
import { getUsers } from "../Store/Actions/SignupSlice";
import { MDBInput } from "mdb-react-ui-kit";
import { BarLoader } from "react-spinners";

const Users = () => {
  const [Reload, setReload] = useState(false);
  const [state, setState] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const ChangeRole = (props, id) => {
    console.log("Toggle");
    if (props.Role === "admin") {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/Users/` + id, {
          firstName: props.firstName,
          lastName: props.lastName,
          email: props.email,
          password: props.password,
          role: "user",
        })
        .then((response) => {
          setReload(!Reload);
        });
    } else {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/Users/` + id, {
          firstName: props.firstName,
          lastName: props.lastName,
          email: props.email,
          password: props.password,
          role: "admin",
        })
        .then((response) => {
          setReload(!Reload);
        });
    }
  };

  // Filtering
  const [filteredList, setfilteredList] = useState([]);
  const check = (e) => {
    var input = e.target.value;
    let updatedList = [...state];
    updatedList = updatedList.filter((item) => {
      return item.firstName.toLowerCase().indexOf(input.toLowerCase()) !== -1;
    });
    setfilteredList(updatedList);
  };

  const [postPerPage] = useState(5);
  const [currentpage, setcurrentPage] = useState(1);

  // const indexofLastPage = postPerPage * currentpage;
  // const indexofFirstPage = indexofLastPage - postPerPage;
  // const data = filteredList.slice(indexofFirstPage, indexofLastPage);

  const paginate = (pageNumber) => {
    dispatch(getUsers({ pageNumber: pageNumber, posts: postPerPage })).then(
      (res) => {
        setState(res.payload.Data);
        setLoading(false);
        setfilteredList(res.payload.Data);
      }
    );
    setcurrentPage(pageNumber);
  };
  // Filtering

  useEffect(() => {
    dispatch(getUsers({ pageNumber: currentpage, posts: postPerPage })).then(
      (res) => {
        setState(res.payload.Data);
        setLoading(false);
        setfilteredList(res.payload.Data);
        setLength(res.payload.len);
      }
    );
    // axios.get("http://localhost:3000/Users").then((response) => {
    // console.log(response['data']);
    //   console.log(response["data"]);
    //   setState([...response["data"]]);
    //   setLoading(false);
    //   setfilteredList([...response["data"]]);
    // });
  }, []);

  return (
    <div className="container p-0 mt-2">
      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">
          <MDBInput
            label="Search By First Name"
            type="text"
            onChange={check}
            className="mb-4"
          />
        </div>
      </div>
      <BarLoader
        color="rgba(54, 142, 214, 1)"
        height={10}
        speedMultiplier={4}
        width={890}
        loading={loading}
      />
      <table className="table table-hover table-primary text-center table-striped mt-2">
        <thead>
          <tr className="table-dark">
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.length > 0 ? (
            filteredList
              .sort((a, b) => {
                return a.firstName.localeCompare(b.firstName);
              })
              .map((elem) => {
                return (
                  <tr key={elem._id} className="p-0">
                    <th scope="col">{elem.firstName}</th>
                    <th scope="col">{elem.lastName}</th>
                    <th scope="col">{elem.email}</th>
                    <th scope="col">{elem.role}</th>
                    <th scope="col">
                      <select
                        className="select border rounded bg-primary text-light"
                        onChange={() => {
                          ChangeRole(elem, elem._id);
                        }}
                        defaultValue={elem.role}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </th>
                  </tr>
                );
              })
          ) : (
            <tr className="mx-auto">
              <th colSpan={5}>
                It looks like there aren't any matches for your search
              </th>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <select className="browser-default custom-select w-25">
          <option selected>Open this select menu</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
        </select>
        <Paginator
          onChangepage={paginate}
          postsPerPage={postPerPage}
          totalPosts={length}
        />
      </div>
    </div>
  );
};

export default Users;
