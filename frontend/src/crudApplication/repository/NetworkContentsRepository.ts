import axios, { AxiosResponse } from "axios";
import {RequestContent, ResponseContent} from "../model/Contents";


export const postContent = async (newContents: RequestContent) => {
  await axios.post('/api/contents', newContents)
}

export const getAllContents = async (): Promise< ResponseContent[] > => {
  const { data } = (await axios.get('/api/contents')) as AxiosResponse
  return data
}

export const putContent = async (updateContents: RequestContent) => {
  await axios.put('/api/contents', updateContents)
}

export const deleteContent = async (deleteNumber: Number) => {
  await axios.delete(`/api/contents/${deleteNumber}`)
}