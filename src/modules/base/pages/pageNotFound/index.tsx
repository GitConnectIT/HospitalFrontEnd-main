import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
// const ErrorBg = require("../../../../main/assets/images/background/error-bg.jpg");

const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <>
      {/* <div
        className="loginBox"
        style={{ background: `url(${ErrorBg}) no-repeat bottom center #fff` }}
      >
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="text-center">
            <h1 className="error-title">404</h1>
            <div className="my-3">
              <h4>PAGE NOT FOUND !</h4>
              <span className="text-muted d-block fs-5">
                You seem to be trying to find his way home{" "}
              </span>
            </div>

            <Link to="/" className="btn btn-danger">
              Back to home
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PageNotFound;
