import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INotification from "../../../interfaces/INotification";
import uniqueId from "lodash/uniqueId";

export interface INotificationStore {
  alerts: INotification[];
}
const initValue: INotificationStore = {
  alerts: [],
};
const notificationStore = createSlice({
  name: "alert",
  initialState: initValue,
  reducers: {
    createAlert: (state, action: PayloadAction<INotification>) => {
      const id = uniqueId("PROVE-notification");
      state.alerts.push({ ...action.payload, id });
    },
    removeAlert: (state, action: PayloadAction<any>) => {
      const index = state.alerts.findIndex(
        (alert) => alert.id === action.payload
      );
      if (index !== -1) state.alerts.splice(index, 1);
    },
  },
});
export default notificationStore;

export const { createAlert, removeAlert } = notificationStore.actions;
