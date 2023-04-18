import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { BarLoader } from "react-spinners";
import moment from "moment";

import axios from "axios";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
// import Blogs from "./Blogs";

const Home = (props) => {
  const [reload, setReload] = useState(true);
  const [state, setState] = useState([]);
  const navigate = useNavigate();
                    
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/Blogs`).then((response) => {
      setState([...response["data"]]);
      setReload(false);
    });
  }, []);

  return (
    <>
      {props.user.role === "admin" ? (
        <div className="d-flex justify-content-center mt-2">
          <MDBBtn
            className="container w-50 p-2 fs-4"
            outline
            onClick={() => navigate("/admin/blogs")}
          >
            Admin Panel
          </MDBBtn>
        </div>
      ) : null}
      <BarLoader
        color="rgba(54, 142, 214, 1)"
        height={8}
        speedMultiplier={4}
        width={1380}
        loading={reload}
        className="mt-2"
      />

      {state.map((elem) => {
        return (
          <div
            className="card text-light bg-primary mt-4 w-75 mx-auto shadow"
            key={elem._id}
          >
            <img
              className="card-img opacity-50"
              src={`https://firebasestorage.googleapis.com/v0/b/blogsite-381509.appspot.com/o/images%2F${elem.img}?alt=media&token=96b1b789-e501-4346-9b09-15ad36dd0847` }
              alt="description"
              height="160"
            />
            <div className="card-img-overlay p-0">
              <p className="card-title text-center mb-1 mt-2 fs-4">{elem.Title}</p>
              <p className="card-text text-center mb-1 fs-6">{elem.Description.slice(0,25)}<b>...</b></p>
              <div className="text-center mb-0">
                <Modal props={elem} />
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text mb-0 mx-2 fs-5"><b>{elem.UserID.firstName}</b></p>
                <p className="card-text mb-0 mx-2 fs-5"><b>{moment(elem.createdTime).fromNow()}</b></p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="py-5"></div>
    </>
  );
};

export default Home;
