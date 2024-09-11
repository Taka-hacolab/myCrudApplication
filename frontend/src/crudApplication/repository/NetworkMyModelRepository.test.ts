import {vi} from "vitest";
import axios from "axios";
import {postMyModel} from "./NetworkMyModelRepository.ts";
import {RequestMyModel} from "../model/MyModel.ts";

vi.mock('axios')
describe('NetworkMyModelRepository', async () => {
  it('postMyModelを実行すると、/api/mymodelにpostする',async () => {
    const stubMyModel: RequestMyModel = {
      name: 'taro',
      age: 18
    }

    postMyModel(stubMyModel)

    expect(axios.post).toHaveBeenCalledWith('/api/mymodel', stubMyModel)
  })
})