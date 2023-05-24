import axios from 'axios';
import IMenuResponse from '../interfaces/controllers/IMenuResponse'
class ApplicationMenuController {

  static async Menu(): Promise<any>{
    // console.log(axios.get('ApplicationMenu/get-all').then(x=>x.data), "ADAWDWD");
    return axios.get('ApplicationMenu/get-all');
  }
}

export default ApplicationMenuController;