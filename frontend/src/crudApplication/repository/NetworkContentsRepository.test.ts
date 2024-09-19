import {vi} from "vitest";
import axios from "axios";
import {postContents} from "./NetworkContentsRepository.ts";
import {RequestContents} from "../model/Contents.ts";


vi.mock('axios')

describe('NetworkContentsRepository', async () => {

  it('postContentsを実行すると、正しい引数で/api/contentsにpostする', () => {
    const stubContents: RequestContents = {
      content: '保存コンテンツ'
    }

    postContents(stubContents)

    expect(axios.post).toHaveBeenCalledWith('/api/contents', stubContents)
  })
})