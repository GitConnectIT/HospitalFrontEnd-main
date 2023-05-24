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
import formValidationManager from "../../../utils/formValidationManager";
import axios from "axios";
import MultiSelect from "../../../components/MultiSelect";
import { createAlert } from "../../../store/stores/notification/notification.store";
import { useDispatch } from "react-redux";
import eNotificationType from "../../../assets/enums/eNotificationType";
import "../../../../modules/manager/pages/managerPage/style.scss";

const CompanyCategories = (props: any) => {
  const { categories, companyId, fetchCategoriesByCompany } = props;
  const { handleSubmit, control } = useForm();
  const [totalCategories, setTotalCategories] = useState([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const fetchAllCategories = async () => {
    const res: any = await (await axios.get("List/categories/get-all")).data;
    setTotalCategories(res.data);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const dispatch = useDispatch();

  const handleDeleteCategory = async (categoryId: number) => {
    const res: any = await (
      await axios.delete(`/Companies/category/${companyId}/${categoryId}`)
    ).data;

    console.log(res, "RES");
    try {
      if (res.result) {
        dispatch(
          createAlert({
            message: res.successMessage,
            timeout: 3000,
            type: eNotificationType.Success,
          })
        );
        fetchCategoriesByCompany(companyId);
      }
    } catch (err: any) {
      dispatch(
        createAlert({
          message: err,
          timeout: 3000,
          type: eNotificationType.Success,
        })
      );
    }
  };

  const handleFormSubmit = async (data: any) => {
    let dataToSubmit: any = [];
    if (data.length == 0) {
      dataToSubmit = [];
    } else {
      dataToSubmit = data.categoryIds.map((d: any) => d.value);
    }
    try {
      if (companyId) {
        const res: any = await axios.put(
          `/Companies/${companyId}/add-categories`,
          { categoryIds: dataToSubmit }
        );
        if (res.data.result) {
          dispatch(
            createAlert({
              message: "Categories edited successfully",
              timeout: 3000,
              type: eNotificationType.Success,
            })
          );
          setOpenDrawer(false);
          fetchCategoriesByCompany(companyId);
        }
      } else {
        dispatch(
          createAlert({
            message: "Something went wrong!",
            timeout: 3000,
            type: eNotificationType.Success,
          })
        );
      }
    } catch (err: any) {
      dispatch(
        createAlert({
          message: err,
          timeout: 3000,
          type: eNotificationType.Success,
        })
      );
    }
  };

  return (
    <>
      <div>
        {categories.length != 0 ? (
          <Row>
            {categories.map((category: any) => {
              return (
                <Col lg={3} md={6} sm={6} xs={12}>
                  <Card
                    style={{
                      width: "18rem",
                      backgroundColor: "lightblue",
                      borderRadius: "1rem",
                    }}
                  >
                    <CardHeader
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        background: "transparent",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={"fa-solid fa-x" as any}
                        color="red"
                        size="lg"
                        className="onClick"
                        onClick={() => handleDeleteCategory(category.id)}
                      />
                    </CardHeader>
                    <CardBody>
                      <CardTitle tag="h2">{category.code}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        <img
                          style={{ width: "100px", height: "100px" }}
                          alt="Category Image"
                          src={
                            category.image &&
                            `data:image/jpeg;base64,${category.image}`
                          }
                        />
                      </CardSubtitle>
                      <CardText>{category.description}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <Alert color="danger" className="text-center">
            There are no categories for this company
          </Alert>
        )}

        <div
          style={{
            display: "flex",
            position: "sticky",
            justifyContent: "end",
            bottom: 0,
          }}
        >
          <Button color="primary" onClick={() => setOpenDrawer(true)}>
            Change Categories
          </Button>
        </div>
      </div>

      <Drawer
        title="Add Category"
        show={openDrawer}
        actions={
          <>
            <Button
              onClick={() => handleSubmit(handleFormSubmit)()}
              color="primary"
            >
              Save
            </Button>
            <Button color="secondary">Cancel </Button>
          </>
        }
        onClose={() => setOpenDrawer(false)}
      >
        <Form>
          <FormGroup>
            <Controller
              control={control}
              name="categoryIds"
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <>
                    <Label htmlFor="Categories">Categories</Label>
                    <MultiSelect
                      id="type"
                      value={value}
                      onChange={onChange}
                      optionsRendered={categories}
                      totalOptions={totalCategories}
                    />
                    <FormFeedback>
                      {formValidationManager.extractError(error)}
                    </FormFeedback>
                  </>
                );
              }}
            />
          </FormGroup>
        </Form>
      </Drawer>
    </>
  );
};

export default CompanyCategories;
