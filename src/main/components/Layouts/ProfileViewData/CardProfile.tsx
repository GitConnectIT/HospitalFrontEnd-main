import React, { FC, useEffect, useRef, useState } from "react";
import IProfileData from "../../../interfaces/controllers/IProfileData";

import {
  Card as CardStrap,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import FileInput from "../../FileInput";
import "./CardProfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAlert } from "../../../store/stores/notification/notification.store";
import eNotificationType from "../../../assets/enums/eNotificationType";
import { updateProfilePic } from "../../../store/stores/user/user.store";
import useGetUser from "../../../hooks/useGetUser";
import { Trans } from "react-i18next";

export interface ICardProps {
  userData: IProfileData;
}
const img4 = require("../../../assets/images/users/user4.jpg");

const CardProfile: FC<ICardProps> = (props: ICardProps) => {
  const dispatch = useDispatch();
  const { userData } = props;
  const [image, setImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);

  const [confirmProfileChange, setConfirmProfileChange] = useState(false);

  const user = useGetUser();
  const inputRef = useRef(null);

  const getImage = async () => {
    if (user.profilePic) {
      const base64Img = await fetch(
        `data:image/jpeg;base64,${user.profilePic}`
      );
      const blobImage = await base64Img.blob();
      setImage(blobImage);
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  const handleClick = () => {
    inputRef?.current.click();
  };
  const getImageUrl = (img: any, tempImg: any) => {
    if (tempImg) {
      let result = URL.createObjectURL(tempImg);
      return result;
    }
    if (img) {
      let result = URL.createObjectURL(img);
      return result;
    }
    return img4;
  };

  const updateStore = async (file: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      dispatch(updateProfilePic(encoded));
    };
  };

  const handleConfirmChange = async (e: any) => {
    e.stopPropagation();
    updateStore(tempImage);
    const formData = new FormData();
    formData.set("Image", tempImage);

    const response = await axios.put(`/user/image`, formData);
    if (response.data.result) {
      dispatch(
        createAlert({
          message: "Immagine del profilo modificata con successo",
          type: eNotificationType.SUCCESS,
          timeout: 3000,
        })
      );
      setConfirmProfileChange(false);
    }
  };
  const handleChangeImage = (file: any) => {
    if (file) {
      setTempImage(file);
      setConfirmProfileChange(true);
    }
  };
  const handleDiscardChanges = (e: any) => {
    e.stopPropagation();
    inputRef.current.value = "";
    setConfirmProfileChange(false);
    setTempImage(null);
  };
  return (
    <>
      <CardStrap>
        <CardBody className="p-4">
          <div className="profilepic">
            <img
              src={getImageUrl(image, tempImage)}
              className="profilepic__image"
              alt="profile-pic"
            />
            <FileInput
              ref={inputRef}
              className="d-none"
              allowedFileTypes={["image/png", "image/jpeg"]}
              onChange={handleChangeImage}
            />
            {confirmProfileChange ? (
              <>
                <div className="confirm-buttons" onClick={handleClick}>
                  <Button onClick={handleDiscardChanges} color="danger">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmChange} color="success" outline>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="profilepic__content" onClick={handleClick}>
                  <FontAwesomeIcon
                    size="2x"
                    icon={"fa-solid fa-camera" as any}
                  />
                  <span className="profilepic__text">Edit Profile</span>
                </div>
              </>
            )}
          </div>
          <CardTitle tag="h4" className="mt-2 mb-1 text-center">
            {userData !== null
              ? userData.firstName + " " + userData.lastName
              : ""}
          </CardTitle>
        </CardBody>
        <CardBody className="border-top p-4">
          <div>
            <CardSubtitle className="text-muted fs-5"><Trans i18nKey={"generic.fullName"}>Name</Trans></CardSubtitle>
            <CardTitle tag="h5">
              {userData.firstName !== null && userData.lastName !== null
                ? userData.firstName + " " + userData.lastName
                : "No phone number yet"}
            </CardTitle>

            <CardSubtitle className="text-muted fs-5 mt-3"><Trans i18nKey={"generic.phoneNumber"}>Phone</Trans></CardSubtitle>
            <CardTitle tag="h5">
              {userData.phoneNumber !== null
                ? userData.phoneNumber
                : "No phone number yet"}{" "}
            </CardTitle>

            <CardSubtitle className="text-muted fs-5 mt-3">
            <Trans i18nKey={"generic.location"}>Address</Trans>
            </CardSubtitle>
            <CardTitle tag="h5">
              {userData.address != null
                ? userData.address +
                  ", " +
                  userData.city +
                  ", " +
                  userData.state +
                  ", " +
                  userData.zipCode
                : "No adress yet"}{" "}
            </CardTitle>

            <CardSubtitle className="text-muted fs-5 mt-3 mb-2">
            <Trans i18nKey={"generic.socialProfile"}>Social Profile</Trans>
            </CardSubtitle>
            <div className="d-flex align-items-center gap-2">
              <Button className="btn-circle" color="info">
                <i className="bi bi-facebook"></i>
              </Button>
              <Button className="btn-circle" color="success">
                <i className="bi bi-twitter"></i>
              </Button>
              <Button className="btn-circle" color="danger">
                <i className="bi bi-youtube"></i>
              </Button>
            </div>
          </div>
        </CardBody>
      </CardStrap>
    </>
  );
};

export default CardProfile;
