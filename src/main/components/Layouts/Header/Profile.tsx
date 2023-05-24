import { DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import useGetUser from "../../../hooks/useGetUser";
//@ts-ignore
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { ToggleCustomizer } from "../../../store/stores/customizer/customizer.store";
import { useState } from "react";

const user1 = require("../../../assets/images/users/user4.jpg");

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useGetUser();
  /* eslint-disable */
  const [img, setImg] = useState(null);
  const getImageUrl = (blob: any) => {
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return user1;
  };
  // const getImage = async () => {
  //   if (user.profilePic) {
  //     const base64Img = await fetch(
  //       `data:image/jpeg;base64,${user.profilePic}`
  //     );
  //     const blobImage = await base64Img.blob();
  //     setImg(blobImage);
  //   }
  // };
  // useEffect(() => {
  //   if (!user) return;
  //   getImage();
  // }, [user]);

  if (!user) {
    return null;
  }
  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img
          src={getImageUrl(img)}
          alt="user"
          className="rounded-circle"
          width="60"
          height="60"
        />
        <span>
          <h5 className="mb-0">
            {user.firstName} {user.lastName}
          </h5>
          <small className="fs-6 text-muted">{user.email}</small>
        </span>
      </div>
      <DropdownItem
        onClick={() => navigate(`/${user.role.toLowerCase()}/profile/viewEdit`)}
        className="px-4 py-3"
      >
        <FontAwesomeIcon icon={"fa-solid fa-user" as any} size="lg" />
        &nbsp;My Profile
      </DropdownItem>

      <DropdownItem
        onClick={() => dispatch(ToggleCustomizer())}
        className="px-4 py-3"
      >
        <FontAwesomeIcon icon={"fa-solid fa-droplet" as any} size="lg" />
        &nbsp; Customize
      </DropdownItem>
    </div>
  );
};

export default Profile;
