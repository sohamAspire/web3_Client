import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmailGetting = () => {
  const [success, setSuccess] = useState(false);
  const Navigate = useNavigate();
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const resetPasswordForm = (data) => {
    axios.post("http://localhost:3000/reset", data).then((res) => {
      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          Navigate("/");
        }, 2000);
      }
    });
    // Navigate("")
    resetField("email");
  };
  return (
    <>
      {success ? (
        <div class="alert alert-success text-center" role="alert">
          Email Has Been Sent Successfully
        </div>
      ) : null}

      <div className="container mt-5 w-50 Forgot">
        <form onSubmit={handleSubmit(resetPasswordForm)}>
          <h1 className="text-center mb-4 h1"> Reset Password</h1>
          <MDBInput
            label="Email"
            className="mb-4"
            type="email"
            size="lg"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <small className="text-danger mx-2">Email is Required</small>
          )}
          <MDBBtn type="submit" block className="mt-2" color="primary">
            Send Email
          </MDBBtn>
        </form>
      </div>
    </>
  );
};

export default EmailGetting;
