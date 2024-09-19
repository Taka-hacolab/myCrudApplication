import axios from "axios";
import {RequestContents} from "../model/Contents.ts";


export const postContents = async (newContents: RequestContents) => {
  await axios.post('/api/contents', newContents)
}