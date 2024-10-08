import {InformationInput} from "./InformationInput";
import {render, screen} from "@testing-library/react";
import {vi} from "vitest";
import {postContents} from "../repository/NetworkContentsRepository";
import userEvent from '@testing-library/user-event'
import {act} from "react";

describe('<InformationInput />', () => {
  it('初期レンダリング時に指定の要素がレンダリングされていること', async () => {
    await act (async () => {
      renderInformationInput()
    })
    //TODO 原因調査

    expect(screen.getByText('ToDoApp')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('コンテンツを入力')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '保存'}))
  })

  it('保存ボタンを押すと、正しい引数でpostContentsを呼び出す', async () => {
    await act (async () => {
      renderInformationInput()
    })
    vi.mock('../repository/NetworkContentsRepository.ts')

    const inputContent = screen.getByRole('textbox') as HTMLInputElement

    await userEvent.type(inputContent, 'hoge')
    await userEvent.click(screen.getByRole('button', {name: '保存'}))

    expect(postContents).toHaveBeenCalledWith({content: 'hoge',status:'notFinished'})
  })
})

const renderInformationInput = () => {
  return render(<InformationInput/>)
}