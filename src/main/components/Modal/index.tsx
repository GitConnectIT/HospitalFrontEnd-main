import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal as StrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./index.scss";
export interface IModalProps {
  title: any;
  show: boolean;
  onClose: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}
const Modal = (props: IModalProps) => {
  const { title, show, actions, children, onClose } = props;

  return (
    <StrapModal isOpen={show}>
      <ModalHeader>
        {title}
        <FontAwesomeIcon
          className="close-icon"
          onClick={() => onClose()}
          icon={"fa-solid fa-x" as any}
        />
      </ModalHeader>
      <ModalBody>{children}</ModalBody>

      {actions && <ModalFooter>{actions}</ModalFooter>}
    </StrapModal>
  );
};

export default Modal;
