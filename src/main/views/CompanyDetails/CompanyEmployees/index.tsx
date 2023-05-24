import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import Drawer from "../../../components/Drawer";
import axios from "axios";
import "../../../../modules/manager/pages/managerPage/style.scss";
import eFormMode from "../../../assets/enums/eFormMode";
import DetailDrawer from "../../../components/DetailDrawer";
import DeleteModal from "../../../components/ModalDetailDelete";
import Table from "../../../components/table";

const CompanyEmployees = (props: any) => {
  const { companyId } = props;

  const [modeDrawer, setModeDrawer] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const [deleteRowId, setDeleteRowId] = useState<number>(0);

  const onIconClick = async (rowId: number, actionMethod: string) => {
    switch (actionMethod) {
      case eFormMode.Edit:
        const m = await (await axios.get(`Employess/${rowId}`)).data;
        setFormData(m.data);
        setModeDrawer(eFormMode.Edit);
        break;

      case eFormMode.Delete:
        setDeleteRowId(rowId);
        break;
    }
  };

  const handleEmployeeAdd = () => {
    setModeDrawer(eFormMode.Insert);
  };

  const handleClose = () => {
    setModeDrawer(null);
    setFormData([]);
    setDeleteRowId(0);
  };

  const handleCloseModal = () => {
    setDeleteRowId(0);
  };

  return (
    <div>
      <Table
        onIconClick={onIconClick}
        handleAddRow={handleEmployeeAdd}
        controller={`Employess/${companyId}`}
      />
      {(modeDrawer || formData) && (
        <DetailDrawer
          onClose={handleClose}
          modeDrawer={modeDrawer}
          formData={formData}
          controller={companyId ? `Employess/${companyId}` : "Employess"}
        >
          HELLO WORLD
        </DetailDrawer>
      )}
      {deleteRowId != 0 && (
        <DeleteModal
          controller={`Employess/${companyId}`}
          deleteId={deleteRowId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CompanyEmployees;
