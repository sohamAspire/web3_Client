import React, { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import {
  MDBModalFooter,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";

const Modal = (props) => {
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);
  const colors = []
  const [color , setColor] = useState(null)
  const Btn = () => {
    toggleShow();
  };
  const getColor = () => {
    setColor(state => ({ colors: [...state.colors, ...colors] }))
  };
  return (
    <>
      <i className="fas fa-eye m-2 fs-4" onClick={Btn}></i>
      <MDBModal tabIndex="-1" show={basicModal} setShow={setBasicModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="p-3">
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody
              style={{
                backgroundColor: color,
              }}
            >
              <div>
                <div className="container mx-auto ">
                  <ColorExtractor getColors={getColor}>
                    <img
                      src={`https://firebasestorage.googleapis.com/v0/b/blogsite-381509.appspot.com/o/images%2F${props.props.img}?alt=media&token=96b1b789-e501-4346-9b09-15ad36dd0847`}
                      alt="Img"
                      width="100"
                      height="100"
                      className="img-fluid mb-2"
                    />
                  </ColorExtractor>
                </div>
                <h1 className="h4 text-dark mt-2">
                  Title: {props.props.Title}
                </h1>
                <h1 className="h6 text-dark mt-2">
                  Description: {props.props.Description}
                </h1>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Modal;
