import eNotificationType from '../../../assets/enums/eNotificationType';
import AuthManager from '../../../utils/authManager';
import { AppThunk } from '../../redux/appThunk';
import { createAlert } from '../notification/notification.store';

const onRegister = (payload: any, navigate:any): AppThunk => async (dispatch) => {

  try {
    await AuthManager.register({ ...payload });
    dispatch(
      createAlert({
        message: `Registered`,
        type: eNotificationType.Success,
        timeout: 3000,
      })
    );
    navigate('/');
  } catch (err:any) {
    Error(err.message);
  }
};

export default onRegister;
