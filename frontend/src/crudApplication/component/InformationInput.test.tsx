import {InformationInput} from "./InformationInput.tsx";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {postMyModel} from "../repository/NetworkMyModelRepository.ts";
import {vi} from "vitest";
import {postContents} from "../repository/NetworkContentsRepository.ts";

describe('<InformationInput />', () => {
  it('初期レンダリング時に指定の要素がレンダリングされていること', async () => {
    await renderInformationInput()

    expect(screen.getByText('ToDoApp')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('コンテンツを入力')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '保存'}))
  })

  it('保存ボタンを押すと、正しい引数でpostContentsを呼び出す', async () => {
    await renderInformationInput()
    vi.mock('../repository/NetworkContentsRepository.ts')

    const inputContent = screen.getByRole('textbox')

    await userEvent.type(inputContent, 'hoge')
    await userEvent.click(screen.getByRole('button', {name: '保存'}))

    expect(postContents).toHaveBeenCalledWith({content: 'hoge'})
  })
})

const renderInformationInput = () => {
  return render(<InformationInput/>)
}