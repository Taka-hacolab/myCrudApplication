import {InformationInput} from "./InformationInput";
import {render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import {getAllContents, postContents, putContents} from "../repository/NetworkContentsRepository";
import userEvent from '@testing-library/user-event'
import {act} from "react";

vi.mock('../repository/NetworkContentsRepository', () => ({
  getAllContents: vi.fn(),
  postContents: vi.fn(),
  putContents: vi.fn(),
}));

describe('<InformationInput />', () => {
  describe('初期レンダリング時', () => {
    it('指定の要素がレンダリングされていること', async () => {
      //TODO 原因調査
      await act(async () => {
        renderInformationInput()
      })

      expect(screen.getByText('ToDoApp')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('コンテンツを入力')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: '保存'}))
    })

    it('フックのgetAllContentsが動作し、保存されているコンテンツが正しく表示される', async () => {
      const stubStoredContents = [
        {id: 1, content: 'hoge', isDone: false},
        {id: 2, content: 'fuga', isDone: true},
      ]

      vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

      //TODO 原因調査
      await act(async () => {
        renderInformationInput()
      })

      //TODO await waitForを使わなくてもテストできないかを調査
      await waitFor(() => {
        expect(screen.getAllByRole('button', {name: '更新'})[0]).toBeInTheDocument();
        const targetCheckBoxElement = screen.getByLabelText('fuga') as HTMLInputElement
        expect(targetCheckBoxElement.checked).toBe(true)
      });
    })
  })


  it('保存ボタンを押すと、正しい引数でpostContentsを呼び出す', async () => {
    await act(async () => {
      renderInformationInput()
    })

    const inputContent = screen.getByRole('textbox') as HTMLInputElement

    await userEvent.type(inputContent, 'hoge')
    await userEvent.click(screen.getByRole('button', {name: '保存'}))

    expect(postContents).toHaveBeenCalledWith({content: 'hoge', isDone: false})
  })

  it('更新ボタンを押すと、正しい引数でputContentsを呼び出す', async () => {
    const stubStoredContents = [
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ]

    vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

    //TODO 原因調査
    await act(async () => {
      renderInformationInput()
    })

    //TODO await waitForを使わなくてもテストできないかを調査
    await waitFor(() => {
      const targetCheckBoxElement = screen.getByLabelText('hoge') as HTMLInputElement

      userEvent.click(targetCheckBoxElement)
      userEvent.click(screen.getAllByRole('button', {name: '更新'})[0])

      expect(putContents).toHaveBeenCalledWith({id: 1, content: 'hoge', isDone: true})
    });
  })
})

const renderInformationInput = () => {
  return render(<InformationInput/>)
}