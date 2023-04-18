/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Pagination from "./Pagination";
import Modal from "./Modal";
import { storage } from "../firebase";
import { ref, uploadBytes , deleteObject} from "firebase/storage";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import Update from "./Update";

const Blogs = (props) => {
  // This Reload os to updating state
  const [Reload, setReload] = useState(true);
  const [Title, setTitle] = useState();
  const [Success, setSuccess] = useState(null);
  const [Description, setDescription] = useState();
  const [file, setFile] = useState(null);
  const [state, setState] = useState([]);
  let [loading, setLoading] = useState(true);

  // Pagination

  const [postPerPage] = useState(5);
  const [currentpage, setcurrentPage] = useState(1);

  const indexofLastPage = postPerPage * currentpage;
  const indexofFirstPage = indexofLastPage - postPerPage;
  const data = state.slice(indexofFirstPage, indexofLastPage);
  // Pagination

  // const [users, setUsers] = useState([] );
  const [centredModal, setCentredModal] = useState(false);
  const AddShow = () => setCentredModal(!centredModal);

  const AddBlog = (e) => {
    e.preventDefault();
    const Image = ref( storage, `images/${Date.now().toString() + "." + file.name.split(".")[1]}`);
    uploadBytes(Image, file).then((res) => {
      console.log(res);
    });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/Blogs`,
        {
          Title: Title,
          Description: Description,
          UserID: props.user._id,
          img: Image._location.path_.split('/')[1],
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          // console.log("Successfully Added");
          setReload(!Reload);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        } else {
          setSuccess(false);
          setTimeout(() => {
            setSuccess(null);
          }, 1000);
        }
      });
  };

  const DeleteBlog = useCallback((user) => {
    console.log(user);
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/Blogs/` + user._id).then((res) => {
      if (res.status === 200) {
        const deleteRef = ref(storage, `images/${user.img}`);
        deleteObject(deleteRef).then((res)=>{
          console.log("File Deleted Successfully")
        })
        setReload(!Reload);
      }
    });
  });

  useEffect(() => {
    if (props.isAdmin === "admin") {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/Blogs`).then((response) => {
        setState([...response["data"]]);
        setLoading(false);
      });
    } else {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/Blogs/` + props.user._id)
        .then((response) => {
          setState([...response["data"]]);

          setLoading(false);
        });
    }
  }, [Reload]);

  const updateReload = () => {
    setReload(!Reload);
  };

  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  return (
    <div className="mt-2">
      <h1 className="text-center my-4 shadow p-2">Blogs</h1>
      {Success === true ? (
        <div
          className="container alert alert-success alert-dismissible fade show d-flex justify-content-between p-3"
          role="alert"
        >
          <strong className="mt-2">Your Data has been Submitted</strong>
        </div>
      ) : Success === false ? (
        <div
          className="container alert alert-danger alert-dismissible fade show d-flex justify-content-between p-3"
          role="alert"
        >
          <strong className="mt-2">Something Went Wrong</strong>
          <button
            type="button"
            className=" btn close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
      <div className="container p-3 text-end">
        {props.isLoged ? (
          <MDBBtnGroup size="lg">
            <MDBBtn
              className="p-4 fs-6"
              size="lg"
              id="Addbtn"
              onClick={AddShow}
            >
              Add Blog
            </MDBBtn>
          </MDBBtnGroup>
        ) : null}
      </div>
      {/* Modal */}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Blog</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={AddShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={AddBlog}>
                <MDBInput
                  label="Title"
                  id="typeText"
                  type="text"
                  onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <MDBTextArea
                  label="Description"
                  id="textAreaExample"
                  rows={4}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <br />
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload Image Of blog
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </div>
                <br />
                <MDBBtn type="submit" onClick={AddShow}>
                  Save changes
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      {/* Modal  */}
      <div className="container mb-2">
        {props.isAdmin === "admin" ? (
          <BarLoader
            color="rgba(54, 142, 214, 1)"
            height={8}
            speedMultiplier={4}
            width={840}
            loading={loading}
          />
        ) : (
          <BarLoader
            color="rgba(54, 142, 214, 1)"
            height={8}
            speedMultiplier={4}
            width={1110}
            loading={loading}
          />
        )}

        <table className="table table-hover table-primary text-center table-striped mt-2">
          <thead>
            <tr className="table-dark">
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => {
                return a.Title.localeCompare(b.Title);
              })
              .map((elem) => {
                return (
                  <tr key={elem._id}>
                    <>
                      <th scope="col">{elem.Title}</th>
                      <th scope="col">{elem.Description}</th>
                      <th scope="col">
                        <Modal props={elem} />
                        <Update
                          props={elem}
                          updateReload={updateReload}
                          id={elem._id}
                        />
                        <i
                          className="far fa-trash-alt text-danger m-2 fs-4"
                          onClick={() => DeleteBlog(elem, elem._id)}
                        ></i>
                      </th>
                    </>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          data={state}
          postPerPage={postPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Blogs;
// users.find((user)=>user.id === elem.UserID).FirstName
