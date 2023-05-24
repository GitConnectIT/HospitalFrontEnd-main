import { combineReducers } from "@reduxjs/toolkit";
import userStore from "../stores/user/user.store";
import navigationStore from "../stores/navigation/navigation.store";
import notificationStore from "../stores/notification/notification.store";
import customizerStore from "../stores/customizer/customizer.store";

const rootReducer = combineReducers({
  user: userStore.reducer,
  navigation: navigationStore.reducer,
  notification: notificationStore.reducer,
  customizer: customizerStore.reducer,
});

export default rootReducer;
