import React, { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes} from "firebase/storage";
import {
  MDBModalFooter,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTextArea,
} from "mdb-react-ui-kit";

const Update = (props) => {
  const [basicModal1, setBasicModal1] = useState(false);
  const [Reload, setReload] = useState(true);
  const [Title, setTitle] = useState();
  const [file, setFile] = useState(null);
  const [Description, setDescription] = useState();
  const toggleShow = () => setBasicModal1(!basicModal1);
  const update = () => {
    toggleShow();
  };

  const UpdateBlog = (e) => {
    e.preventDefault();
    const Image = ref( storage, `images/${Date.now().toString() + "." + file.name.split(".")[1]}`);
    uploadBytes(Image, file).then((res) => {
      console.log(res);
    });
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/Blogs/` + props.id, {
        Title: Title,
        Description: Description,
        UserID: props.props.UserID, 
        img: Image._location.path_.split('/')[1],
      },
      { headers: { "Content-Type": "multipart/form-data" } })
      .then((response) => {
        // console.log(response['data']);
        setReload(!Reload);
        console.log(response);
        console.log("Updated");
        props.updateReload(Reload);
      });
    update();
  };
  return (
    <>
      <i className="fas fa-edit m-2 text-info fs-4" onClick={update}></i>
      <MDBModal tabIndex="-1" show={basicModal1} setShow={setBasicModal1}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Your Blog</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <form onSubmit={UpdateBlog}>
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
                <div className="container mx-auto ">
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/blogsite-381509.appspot.com/o/images%2F${props.props.img}?alt=media&token=96b1b789-e501-4346-9b09-15ad36dd0847` }
                    alt="Img"
                    width="100"
                    height="100"
                    className="img-fluid mb-2"
                  />
                </div>

                <div className="mb-3 text-start">
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
                <MDBBtn type="submit" onClick={UpdateBlog}>
                  Save changes
                </MDBBtn>
              </form>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={update}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Update;
