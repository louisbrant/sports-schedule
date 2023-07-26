import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./../../components/layout/layout";
import Input from "./../../components/common/input";
import Form from "./../../components/common/form";
import RegisterModel from "./register-model";
import RegisterValidation from "./register-validation";
import ValidationService from "./../../shared/validation-service";
import RegisterService from "./register-service";
import AuthService from "../../shared/auth-service";
import Loading from "./../../components/common/loading";
import userTypes from "../../constants/user-types";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const schema = new RegisterValidation().schema;
  const [registerModel, setRegisterModel] = useState(new RegisterModel());
  const [errors, setErrors] = useState({});
  const [requesting, setRequesting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  useEffect(() => {
    const isAthenticated = AuthService.isAthenticated();
    if (isAthenticated) router.push("/");
    const regModel = { ...registerModel };
    regModel.type = userTypes.facilityOwner;
    setRegisterModel(regModel);
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const errorsList = { ...errors };
    const registerData = Object.assign(new RegisterModel(), registerModel);
    registerData[input.name] = input.value;
    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      registerData
    );
    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];
    setErrors(errorsList);
    setRegisterModel(registerData);
  };

  const handleRegister = async () => {
    setRequesting(true);
    setServerErrorMessage("");
    const isValid = validate();
    if (!isValid) {
      setRequesting(false);
      return null;
    }
    try {
      await RegisterService.register(registerModel);
      setRequesting(false);
      toast.success("Acount created succesfully!");
      router.push("/login");
    } catch (error) {
      setRequesting(false);
      setServerErrorMessage(error.message);
    }
  };

  const validate = () => {
    const err = ValidationService.validate(schema, registerModel);
    if (err) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return (
    <Layout pageTitle="register" showHeaderAndFooter={false}>
      <div className="auth__mainblock webapp__auth__main" style={{ marginTop: "-83px" }}>
        <div className="login-side-image">
          <div className="image__overlay"></div>
        </div>
        <div className="auth__box__center">
          <div className="login-content">
            <div className="logo">
              <Link href="/">
                <img className="logo-bg" src="/assets/logo.png" />
              </Link>
            </div>
            <h3 className="auth__title">Get started by creating a free account.</h3>
            <Form className="form signup-form">
              <div className="input__type">
                <label>Email</label>
                <Input
                  name="email"
                  placeholder="Your email"
                  type="email"
                  className="form-control fieldinput-signin"
                  value={registerModel.email.toLowerCase()}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="input__type">
                <label>Password</label>
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control fieldinput-signin"
                  value={registerModel.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <div className="input__type">
                <label>Confirm Password</label>
                <Input
                  name="password2"
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control fieldinput-signin"
                  value={registerModel.password2}
                  onChange={handleChange}
                  error={errors.password2}
                />
              </div>
              <div className="errormsg">
                {serverErrorMessage && (
                  <div className=" alert alert-danger">
                    {serverErrorMessage}
                  </div>
                )}
              </div>
              <div className="form-action-btn mb-3">
                {requesting && <Loading />}
                <input
                  disabled={requesting}
                  onClick={handleRegister}
                  type="button"
                  className="kh-btn"
                  value="Sign up"
                />
              </div>
              <div className="d-flex flex-row justify-content-center new__signup__text">
                Have WebRoo account?
                <Link href="/login">
                  <a className="ml-2 blue">Login now</a>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterForm;