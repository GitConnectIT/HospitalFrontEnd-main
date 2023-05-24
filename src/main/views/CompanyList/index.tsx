import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
} from "reactstrap";
import CompaniesSearch from "./CompanySearch";
import CompanyListItem from "./CompanyListItem";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { createAlert } from "../../store/stores/notification/notification.store";
import eNotificationType from "../../assets/enums/eNotificationType";

const CompanyList = (props: any) => {
  const { setCompanyId } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [activeId, setActiveId] = useState(0);

  const [deleteId, setDeleteId] = useState(0);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    const res: any = await axios.post("Companies/loggedUser/get-all", {
      searchTerm: "",
      pageNumber: 1,
      pageSize: 5,
      sorting: [],
    });
    setCompanies(res.data.data.rows);
    setCompanyId(res.data.data.rows[0].id);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async () => {
    const res: any = await axios.delete(`/Companies/${deleteId}`);
    if (res.data.result) {
      dispatch(
        createAlert({
          message: res.data.successMessage,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      fetchCompanies();
      setOpen(false);
    }
  };

  return (
    <div>
      <Card style={{ height: "90vh" }}>
        <CardHeader>
          <CompaniesSearch
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
        </CardHeader>
        <CardBody>
          <Nav>
            {companies.map((company: any) => (
              <CompanyListItem
                key={company.id}
                active={activeId}
                {...company}
                firstname={company.name}
                onContactClick={() => {
                  setActiveId(company.id);
                  setCompanyId(company.id);
                }}
                handleEdit={() => navigate(`/manager/company/${company.id}`)}
                onDeleteClick={() => {
                  setOpen(true);
                  setDeleteId(company.id);
                }}
              />
            ))}
          </Nav>
        </CardBody>
      </Card>

      <Modal
        title="Delete company"
        show={open}
        onClose={() => setOpen(false)}
        actions={
          <>
            <Button color="primary" onClick={() => handleDelete()}>
              Yes
            </Button>
            <Button color="secondary" onClick={() => setOpen(false)}>
              No
            </Button>
          </>
        }
      >
        Are u sure you want to delete this company?
      </Modal>
    </div>
  );
};

export default CompanyList;
