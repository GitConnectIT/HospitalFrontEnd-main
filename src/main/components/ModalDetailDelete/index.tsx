import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import eNotificationType from "../../../main/assets/enums/eNotificationType";
import Modal from "../Modal";
import { createAlert } from "../../../main/store/stores/notification/notification.store";
import EventManager from "../../utils/eventManager";

const DeleteModal = (props: any) => {
  const { deleteId, handleCloseModal, controller } = props;

  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (deleteId) {
      const result = await axios.delete(
        `/${controller.split("/")[0]}/${deleteId}`
      );
      if (result.data.result) {
        dispatch(
          createAlert({
            message: `${result.data.successMessage}`,
            timeout: 3000,
            type: eNotificationType.Success,
          })
        );
        EventManager.raiseRefreshTable(controller);
      }
      handleCloseModal();
    }
  };

  return (
    <div>
      <Modal
        title={`Delete ${controller}`}
        show={deleteId !== 0}
        onClose={() => handleCloseModal()}
        actions={
          <>
            <Button color="danger" onClick={() => handleDelete()}>
              {" "}
              Delete{" "}
            </Button>
            <Button color="secondary" onClick={() => handleCloseModal()}>
              {" "}
              Cancel{" "}
            </Button>
          </>
        }
      >
        Are u sure u want to delete this {controller} ?
      </Modal>
    </div>
  );
};

export default DeleteModal;
