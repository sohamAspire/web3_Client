import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [alert, setAlert] = useState(null);
  const { id, token } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/reset-password/${id}/${token}`)
      .then((res) => {
        if (res["status"] === 200) {
          setSuccess(true);
        }
        else{
          setSuccess(false);
        }
      });
  });

  const newPassword = (Data) => {
    if (Data.password === Data.confirmPassword) {
      axios
        .post(`http://localhost:3000/reset-password/${id}/${token}`, {
          password: Data.password,
        })
        .then((res) => {
          if ([res].length >= 1) {
            setAlert(true);
            setTimeout(() => {
              Navigate("/login");
            }, 1000);
          }
          else{
            return (<h1 className="text-danger">Something Went Wrong</h1>)
          }
        });
    }
  };

  if (success === true) {
    return (
      <>
        {alert ? (
          <div className="alert alert-success text-center" role="alert">
          Your password has been changed successfully
        </div>
        ) : null}
        <div className="container Forgot mt-5 w-50">
          <form onSubmit={handleSubmit(newPassword)}>
            <h4 className="h4 mb-4">Please set your new password</h4>
            <MDBInput
              label="Password"
              id="form1"
              type="password"
              className="mb-4"
              size="lg"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <small className="text-danger mx-2">Password is Required</small>
            )}
            <MDBInput
              label="Confirm Password"
              id="form1"
              type="password"
              className="mb-4"
              size="lg"
              {...register("confirmPassword", { required: true })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword?.type === "required" && (
              <small className="text-danger mx-2">
                Confirm Password is Required
              </small>
            )}

            <MDBBtn
              type="submit"
              block
              className="mt-2 p-2 fs-5"
              color="primary"
            >
              Submit
            </MDBBtn>
          </form>
        </div>
      </>
    );
  } else if(success === true) {
    return (
      <>
        <div className="alert alert-danger text-center" role="alert">   
          Your Link Has been Expired or Incorrect URL
        </div>
      </>
    );
  }
  else{
    return(
      null
    )
  }
};

export default ResetPassword;
