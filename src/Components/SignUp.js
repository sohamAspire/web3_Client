import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../Store/Actions/SignupSlice";

const SignUp = () => {
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.Register);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (Data) => {
    dispatch(addData(Data));
    resetField("firstName");
    resetField("lastName");
    resetField("email");
    resetField("password");
  };

  useEffect(() => {
    if (status.success === true) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [status.success]);

  return (
    <div className="container w-50 mt-2 p-2 bg-light">
      {alert === true ? (
        <div
          className="alert alert-success alert-dismissible fade show d-flex justify-content-between p-3"
          role="alert"
        >
          <strong className="mt-2">Your Data has been submitted</strong>
        </div>
      ) : null}
      <h1 className="text-center mt-4 shadow p-2"> Registration</h1>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <MDBRow className="mb-2 mt-4">
          <MDBCol>
            <MDBInput
              id="form3Example1"
              className="fs-6 mb-2"
              label="First name"
              {...register("firstName", { required: true })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            {errors.firstName?.type === "required" && (
              <small className="text-danger mx-1 mb-2">
                First Name is Required
              </small>
            )}
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="form3Example2"
              label="Last name"
              className="fs-6 mb-2"
              {...register("lastName", { required: true })}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors.lastName?.type === "required" && (
              <small className="text-danger mx-1 mb-2">
                Last Name is Required
              </small>
            )}
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-2">
          <MDBCol>
            <MDBInput
              className="fs-6 mb-2"
              type="email"
              label="Email address"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <small className="text-danger mb-0 mx-1">Email is Required</small>
            )}
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <MDBInput
              className="fs-6 mb-2"
              type="password"
              id="form3Example4"
              label="Password"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <small className="text-danger mb-0 mx-1">
                Password is Required
              </small>
            )}
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit" className="fs-4 mt-4" block>
          Sign Up
        </MDBBtn>
      </form>
    </div>
  );
};

export default SignUp;
