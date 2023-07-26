import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { axiosApi } from "../../helpers/axios";
import { ADMIN } from "../../helpers/roles";

import Layout from "../../components/layout/layout";
import Input from "../../components/common/input";
import Form from "../../components/common/form";
import LoginModel from "./login-model";
import LoginValidation from "./login-validation";
import LoginService from "./login-service";
import AuthService from "../../shared/auth-service";
import Loading from "../../components/common/loading";
import ValidationService from "./../../shared/validation-service";

const LoginForm = () => {
  const router = useRouter();
  const schema = new LoginValidation().schema;
  const [loginModel, setLoginModel] = useState(new LoginModel());
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  useEffect(() => {
    const isAthenticated = AuthService.isAthenticated();

    if (isAthenticated) {
      router.push("/");
    }
  }, []);

  const handleCheckBoxChange = ({ currentTarget: input }) => {
    setRememberMe(input.checked);
  };

  const handleChange = ({ currentTarget: input }) => {
    setServerErrorMessage("");
    const errorsList = { ...errors };
    const loginData = Object.assign(new LoginModel(), loginModel);
    loginData[input.name] = input.value;
    const errorMessage = ValidationService.validateProperty(
      input,
      schema,
      loginData
    );
    if (errorMessage) errorsList[input.name] = errorMessage;
    else delete errorsList[input.name];
    setErrors(errorsList);
    setLoginModel(loginData);
  };

  //calling service
  const handleLogin = async () => {
    setRequesting(true);
    setServerErrorMessage("");
    const isValid = validate();
    if (!isValid) return setRequesting(false);
    try {
      const res = await LoginService.login(loginModel);

      const user = res.data?.user;
      if (user.token) {
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.token}`;

        if (rememberMe) {
          AuthService.setUserDataToLocalStorage(user);
        } else {
          AuthService.setUserDataToSessionStorage(user);
        }

        /**
         * If logged user == admin
         * then redirect to admin dashboard
         * else redirect to home page
         */
        if (user.roleId === ADMIN) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        setServerErrorMessage(resData.message);
        return setRequesting(false);
      }
    } catch (error) {
      if (error?.status == "400") setServerErrorMessage(error.message);
      else setServerErrorMessage("Invalid email or password");
    }
    setRequesting(false);
  };

  const validate = () => {
    const err = ValidationService.validate(schema, loginModel);
    if (err) {
      setErrors(err);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  return (
    <Layout pageTitle="login" showHeaderAndFooter={false}>
      <div
        className="auth__mainblock webapp__auth__main"
        style={{ marginTop: "-83px" }}
      >
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
            <h3 className="auth__title">Login to your account === we can work in whatsapp (7 702 628 3916)</h3>
            <Form className="form login-form" doSubmit={handleLogin}>
              <div className="input__type">
                <label>Email</label>
                <Input
                  name="email"
                  placeholder="Your email"
                  type="email"
                  className="form-control"
                  value={loginModel.email.toLowerCase()}
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
                  className="form-control"
                  value={loginModel.password}
                  onChange={handleChange}
                  error={errors.password}
                />
              </div>
              <div className="d-flex flex-row justify-content-between mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={rememberMe}
                    className="custom-control-input"
                    id="rememberMe"
                    onChange={handleCheckBoxChange}
                  />
                  <label className="custom-control-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <div className="forgot-password">
                  <Link href="/forgot-password">
                    <a className="red">Forgot password?</a>
                  </Link>
                </div>
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
                  type="submit"
                  className="kh-btn"
                  value="Login"
                />
              </div>
              <div className="d-flex flex-row justify-content-center new__signup__text">
                Don’t have WebRoo account?
                <div className="ml-2 blue">
                  <Link href="/register">Signup now</Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
