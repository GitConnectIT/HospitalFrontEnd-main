import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./style.scss";
import { removeAlert } from "../../store/stores/notification/notification.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

const Notification = () => {
  const notification = useSelector((state: RootState) => state.notification);
  const [timeoutsInvoked, setTimeOutsInvoked] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.alerts.length > 0) {
      notification.alerts.forEach((alert) => {
        if (alert.timeout) {
          if (
            timeoutsInvoked.findIndex((timeout) => timeout.id === alert.id) ===
            -1
          ) {
            setTimeout(() => {
              dispatch(removeAlert(alert.id));
            }, alert.timeout);
            const timeOuts = [...timeoutsInvoked];
            timeOuts.push({ id: alert.id });
            setTimeOutsInvoked(timeOuts);
          }
        }
      });
    } else {
      setTimeOutsInvoked([]);
    }
  }, [notification]);

  return (
    <>
      <div className="notification-wrapper">
        <AnimatePresence>
          {notification.alerts.map((alert, index) => {
            let icon = "";
            switch (alert.type) {
              case "error":
                icon = "xmark";
                break;
              case "info":
                icon = "question";
                break;
              case "warning":
                icon = "info";
                break;
              default:
                icon = "check";
            }
            return (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  y: -50,
                  transition: { duration: 0.2 },
                }}
                className={`notification-content ${alert.type}`}
                key={index}
              >
                <span className="icon">
                  <FontAwesomeIcon
                    size="2x"
                    icon={`fa-solid fa-${icon}` as any}
                  />
                </span>
                <h5 className="notification-message">{alert.message}</h5>
                <span
                  onClick={() => {
                    dispatch(removeAlert(alert.id));
                  }}
                  className="remove-icon"
                >
                  <FontAwesomeIcon
                    size="2x"
                    className="cursor-pointer"
                    icon={"fa-solid fa-circle-xmark" as any}
                  />
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Notification;
