import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const Tag = (props: any) => {
  const { text, onIconClick } = props;

  return (
    <div className="tag d-flex">
      <div className="px-2 tag-text">{text}</div>
      <div>
        <FontAwesomeIcon
          className="pt-1 arrow"
          icon={"fa-solid fa-circle-xmark" as any}
          onClick={onIconClick}
        />
      </div>
    </div>
  );
};

export default Tag;
