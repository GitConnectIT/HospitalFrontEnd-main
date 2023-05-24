import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useLocation, Link } from "react-router-dom";
import "./style.scss";

const BreadCrumbs = () => {
  const location = useLocation();
  const firstUrl = location.pathname.split("/")[1];
  const secondUrl = location.pathname.split("/")[2];
  const thirdUrl = location.pathname.split("/")[3];

  const checkForThirdUrl = () => {
    if (
      !thirdUrl ||
      secondUrl === "content-management" ||
      secondUrl === "reservations" ||
      secondUrl === "user-management" ||
      secondUrl === "configuration"
    )
      return;
    return Link;
  };
  return (
    <>
      <Breadcrumb className="py-3">
        <BreadcrumbItem
          to="/"
          tag={Link}
          className="text-decoration-none text-black"
        >
          Home
        </BreadcrumbItem>
        {firstUrl ? (
          <BreadcrumbItem to={`/${firstUrl}`} tag={Link} className="text-black">
            {firstUrl}
          </BreadcrumbItem>
        ) : (
          ""
        )}
        {secondUrl ? (
          <BreadcrumbItem
            active={checkForThirdUrl ? true : false}
            tag={checkForThirdUrl()}
            to={`/${firstUrl}/${secondUrl}`}
          >
            {secondUrl}
          </BreadcrumbItem>
        ) : (
          ""
        )}
        {thirdUrl ? <BreadcrumbItem active>{thirdUrl}</BreadcrumbItem> : ""}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
