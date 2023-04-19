/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Paginator from "./Paginator";
import { useDispatch } from "react-redux";
import { getUsers , updateUser , searchApi} from "../Store/Actions/SignupSlice";
import { MDBInput } from "mdb-react-ui-kit";
import { BarLoader } from "react-spinners";

const Users = () => {
  const [Reload, setReload] = useState(true);
  const [state, setState] = useState([]);
  const [length, setLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const changeRole = (id , value)=>{
    console.log(value);
    const data = {id : id ,role : value}
      dispatch(updateUser(data)).then((res)=>{
        setReload(!Reload)
      })
  } 
  // Filtering

  const [filteredList, setfilteredList] = useState([]);
  const check = (e) => {
      const data = {search : e.target.value , pageNumber: 1, posts: postPerPage }
      dispatch(searchApi(data)).then((res)=>{
        setState([...res.payload]);
      })
      setfilteredList(state); 
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
  }, [Reload]);

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
                        onChange={(e)=>changeRole(elem._id , e.target.value)}
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
