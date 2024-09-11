import {vi} from "vitest";
import axios from "axios";
import {postMyModel} from "./NetworkMyModelRepository.ts";


vi.mock('axios')
describe('NetworkMyModelRepository', async () => {

  test('postMyModelを実行すると、/api/mymodelにpostする',async () => {
    postMyModel()

    expect(axios.post).toHaveBeenCalled()
  })

})