import axios from 'axios';
import {RequestMyModel} from "../model/MyModel.ts";


export const postMyModel = (newMyModel: RequestMyModel) => {
  axios.post('/api/mymodel',newMyModel)
}