import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Label,
  Row,
  CardFooter,
} from "reactstrap";
import eNotificationType from "../../../../main/assets/enums/eNotificationType";
import Drawer from "../../../../main/components/Drawer";
import Modal from "../../../../main/components/Modal";
import { createAlert } from "../../../../main/store/stores/notification/notification.store";
import { handleDateFormat } from "../../../../main/utils/functions";
import "./index.scss";

const ReservationDetails = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [reservationDetails, setReservationDetails] = useState<any>();
  const [availableTimes, setAvailableTimes] = useState<any>();

  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [whsId, setWhsId] = useState<number>(0);

  const dispatch = useDispatch();

  const fetchReservationDetails = async () => {
    const res: any = await (
      await axios.get(`/reservation/${param.id}/details`)
    ).data;
    if (res) {
      setReservationDetails(res.data);
      console.log(handleDateFormat(res.data.startTime), "TIME WDAWD");
    }
  };

  useEffect(() => {
    fetchReservationDetails();
  }, []);
  const handleCancelReservation = async () => {
    const res: any = await (
      await axios.put(`/reservation/${param.id}/cancel`)
    ).data;
    if (res.result) {
      dispatch(
        createAlert({
          message: `Reservation cancelled successfully`,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      navigate("/recepsionist/availableTimes");
    }
  };

  const fetchAvailableTimesForService = async () => {
    const res: any = await (
      await axios.get(
        `workingHourServices/${reservationDetails.serviceId}/timesforservice`
      )
    ).data;
    if (res.result) {
      setAvailableTimes(res.data);
    }
  };

  const confirmReservationPostpone = async () => {
    const res: any = await (
      await axios.put(`/reservation/${param.id}/postponeReservation`, {
        workingHourServiceId: whsId,
        email: reservationDetails.email,
      })
    ).data;
    if (res.result) {
      dispatch(
        createAlert({
          message: `Reservation postponed successfully in the times selected`,
          type: eNotificationType.Success,
          timeout: 3000,
        })
      );
      setShow2(false);
      setShow(false);
      fetchAvailableTimesForService();
      navigate("/recepsionist/availableTimes");
    }
  };

  return (
    <>
      <Card>
        <CardTitle> Reservation Details </CardTitle>
        <CardBody>
          {reservationDetails && (
            <Row>
              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> Start Time </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={handleDateFormat(reservationDetails.startTime)}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> End Time </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={handleDateFormat(reservationDetails.endTime)}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> Service Name </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.serviceName}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label>Client Id </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.clientId}
                />
              </Col>
              <Col md={12} style={{ marginBottom: "1rem" }}>
                {" "}
                <Label> Phone Number </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.phoneNumber}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> Client Name </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.clientName}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> Email </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.email}
                />
              </Col>

              <Col md={12} style={{ marginBottom: "1rem" }}>
                <Label> Status </Label>
                <Input
                  type="text"
                  readonly
                  disabled
                  value={reservationDetails.status}
                />
              </Col>
            </Row>
          )}
        </CardBody>
        <CardFooter
          style={{ display: "flex", justifyContent: "start", gap: "1rem" }}
        >
          <Button color="danger" onClick={() => handleCancelReservation()}>
            {" "}
            Cancel{" "}
          </Button>
          <Button
            color="warning"
            onClick={() => {
              setShow(true);
              fetchAvailableTimesForService();
            }}
          >
            PostPone
          </Button>
        </CardFooter>
      </Card>
      <Drawer
        title="Postpone Reservation"
        onClose={() => setShow(false)}
        show={show}
        actions={
          <>
            <Button color="primary"> Submit </Button>
            <Button color="info" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </>
        }
      >
        {availableTimes &&
          availableTimes.map((time: any) => {
            return (
              <div
                style={{
                  display: "block",
                  borderRadius: "1rem",
                  border: "1px solid gray",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                }}
                className="onHoverClick"
                onClick={() => {
                  setShow2(true);
                  setWhsId(time.id);
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}> Start Time:</span>
                  {handleDateFormat(time.startTime)}
                </div>
                <div>
                  <span style={{ fontWeight: "bold" }}> End Time:</span>
                  {handleDateFormat(time.endTime)}
                </div>
              </div>
            );
          })}
      </Drawer>

      <Modal
        title="Confirm postpone Reservation"
        onClose={() => setShow2(false)}
        show={show2}
        actions={
          <>
            <Button color="primary" onClick={confirmReservationPostpone}>
              {" "}
              Submit{" "}
            </Button>
            <Button color="info" onClick={() => setShow2(false)}>
              Cancel
            </Button>
          </>
        }
      >
        Are you sure you want to confirm this time postpone reservation?
      </Modal>
    </>
  );
};

export default ReservationDetails;
