// import { useRouter } from "next/router";
// import MustBeGuestGuard from "./../components/guards/guest-guard";
// import Layout from "../components/layout";
// import Loading from "../components/common/loading";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import Http from "./../network/http-service";

export default function PasswordVerification() {
  // const router = useRouter();
  // const [info, setInfo] = useState({
  //   loading: false,
  //   error: null,
  // });

  return <div></div>

  // return (
  //   <MustBeGuestGuard>
  //     <Layout pageTitle="password-verification" showHeaderAndFooter={false}>
  //       <div className="d-flex flex-row justify-content-left align-items-top">
  //         <div className="login-side-image d-lg-flex d-md-none d-none"></div>
  //         <div className="login-content col-lg-5 col-md-12">
  //           <div>
  //             <Link href="/">
  //               <img className="logo-bg" src="/assets/logo.png" />
  //             </Link>
  //           </div>
  //           <h1 className="mt-4 ml-4 gray">Recover your account</h1>
  //           <p className="ml-4" style={{ lineHeight: "2" }}>
  //             Enter verification code sent to your email to reset password.
  //           </p>
  //           <form
  //             className="form signin-form d-flex flex-column justify-content-between"
  //             noValidate
  //             onSubmit={formik.handleSubmit}
  //           >
  //             <div>
  //               <div className="form-group mb-2">
  //                 <FormikInput
  //                   type="text"
  //                   placeholder="Verification code"
  //                   className="form-control"
  //                   name="verificationCode"
  //                   formik={formik}
  //                 />
  //               </div>
  //               <div className="form-group mb-2">
  //                 <FormikInput
  //                   type="password"
  //                   placeholder="New Password"
  //                   className="form-control"
  //                   formik={formik}
  //                   name="newPassword"
  //                 />
  //               </div>
  //               <div className="form-group mb-2">
  //                 <FormikInput
  //                   type="password"
  //                   placeholder="Retype Password"
  //                   className="form-control"
  //                   formik={formik}
  //                   name="retypedPassword"
  //                 />
  //                 {info.error && <div className='alert alert-danger'>{info.error}</div>}
  //               </div>
  //               <div className="d-flex flex-column justify-content-center mt-4">
  //                 {info.loading && <Loading />}
  //                 <button
  //                   disabled={info.loading}
  //                   type="submit"
  //                   className="mt-1 mb-1 kh-btn" >
  //                   Reset Password
  //                 </button>
  //               </div>
  //             </div>
  //             <div className="gray mt-4 d-flex flex-row justify-content-center pt-4 ">
  //               Already have WebRoo account?
  //               <Link href="/login">
  //                 <a className="ml-2 red">Login now</a>
  //               </Link>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </Layout>
  //   </MustBeGuestGuard>
  // );
}
