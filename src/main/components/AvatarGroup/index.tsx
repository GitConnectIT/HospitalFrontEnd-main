import { useEffect, useState } from "react";
import "./style.scss";
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  List,
  ListInlineItem,
  UncontrolledDropdown,
} from "reactstrap";
import Tooltip from "../Tooltip";
interface IAvatarItem {
  userId: number;
  profilePic: string;
  fullName: string;
}
interface IAvatarGroup {
  data: IAvatarItem[];
  maxShowingItems: number;
  onChange: (value: number[]) => void;
  className?: string;
}
const AvatarGroup = (props: IAvatarGroup) => {
  const { data, onChange, maxShowingItems, className } = props;
  const [avatars, setAvatars] = useState<IAvatarItem[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const getAvatarsToShow = () => {
    let copyOfAvatars = [...avatars];
    copyOfAvatars = copyOfAvatars.splice(0, maxShowingItems);
    return copyOfAvatars;
  };
  const getHiddenAvatars = () => {
    let copyOfAvatars = [...avatars];
    return (copyOfAvatars = copyOfAvatars.splice(
      maxShowingItems,
      avatars.length - 1
    ));
  };
  useEffect(() => {
    setAvatars(data);
  }, [data]);
  const selectedUserHandler = (userId: number) => {
    let copyOfSelectedUsers = [...selectedUsers];
    let foundIndex = copyOfSelectedUsers.findIndex((user) => user === userId);
    if (foundIndex !== -1) {
      copyOfSelectedUsers.splice(foundIndex, 1);
    } else {
      copyOfSelectedUsers.push(userId);
    }
    setSelectedUsers(copyOfSelectedUsers);
    onChange(copyOfSelectedUsers);
  };

  if (data.length === 0) return <h1>Loading..</h1>;
  return (
    <List className={`avatar-group-list mb-0 ps-0 ${className}`}>
      {getAvatarsToShow().map((itemData) => (
        <ListInlineItem
          onClick={selectedUserHandler.bind(this, itemData.userId)}
          className="avatar-list-item me-0"
          key={itemData.userId}
          id={`avatar-list_item_${itemData.userId}`}
        >
          <div
            className={`imageContainer ${
              selectedUsers.some((id) => id === itemData.userId)
                ? "selected"
                : ""
            }`}
          >
            <img
              className="avatar-image"
              src={itemData.profilePic}
              alt={itemData.fullName}
            />
          </div>
          <Tooltip
            placement="bottom"
            target={`avatar-list_item_${itemData.userId}`}
          >
            {itemData.fullName}
          </Tooltip>
        </ListInlineItem>
      ))}
      <ListInlineItem className="avatar-list-item me-0">
        <UncontrolledDropdown>
          <DropdownToggle
            tag="div"
            className={`p-2 hidden-avatar-container ${
              getHiddenAvatars().some((hiddenAvatar) =>
                selectedUsers.includes(hiddenAvatar.userId)
              )
                ? "selected"
                : ""
            }`}
          >
            <Button className="hidden-avatar-button">
              +{avatars.length - maxShowingItems}
            </Button>
          </DropdownToggle>

          <DropdownMenu
            style={{ borderRadius: "15px", overflow: "hidden" }}
            className="avatars-hidden-list bg-white"
          >
            <h5 className="px-3 pt-2 fw-2 text-black mb-3">Managers</h5>
            {getHiddenAvatars().map((itemData) => (
              <div key={itemData.userId} className="avatars-hidden-item">
                <Label
                  htmlFor={`${itemData.userId}`}
                  className="mb-0 w-100 cursor-pointer fs-6 px-3 py-1 d-flex align-items-center text-black"
                >
                  <Input
                    className="mt-0 cursor-pointer"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                    }}
                    checked={selectedUsers.some(
                      (uId) => uId === itemData.userId
                    )}
                    id={`${itemData.userId}`}
                    type="checkbox"
                    onChange={selectedUserHandler.bind(this, itemData.userId)}
                  />
                  <span className="ps-3">{itemData.fullName}</span>
                </Label>
              </div>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </ListInlineItem>
    </List>
  );
};
export default AvatarGroup;
