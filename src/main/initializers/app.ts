import axiosInit from './axios';
import initStore from '../store/redux/initStore';
import AuthManager from '../utils/authManager';
import JwtManager from '../utils/jwtManager';
import { IUserState } from '../store/stores/user/user.store';
import initIcons from "./icons";

const initApp = async () => {

  await axiosInit();
  let currentUser: IUserState = null;
  try {
    if (JwtManager.accessToken) {
      currentUser = await AuthManager.getUserFromToken();
    }
  } catch (e) {
    console.log('JwtManager.accessToken')
  }

  const appStore = initStore(currentUser);
  initIcons();

  return appStore;
};
export default initApp;


