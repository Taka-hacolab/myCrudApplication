import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {deleteContent, getAllContents, postContent, putContent} from "../repository/NetworkContentsRepository";
import {RequestContent, ResponseContent} from "../model/Contents";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export function InformationInput() {
  const [text, setText] = useState('')
  const [contents, setContents] = useState<ResponseContent[]>([])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleCheckboxChange = (id: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? {...content, isDone: !content.isDone} : content
      )
    )
  }

  const handleContentChange = (id: number, newContent: string) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? {...content, content: newContent} : content
      )
    )
  }

  const handlePostContent = async () => {
    const createContents: RequestContent = {content: text, isDone: false}
    await postContent(createContents)
    getAllContents().then(res => setContents(res)).catch((error) => console.error(error))
  }

  const handlePutContent = async (updateContent: RequestContent) => {
    await putContent(updateContent)
    getAllContents().then(res => setContents(res)).catch((error) => console.error(error))
  }

  const handleDeleteContent = async (deleteContentId: Number) => {
    await deleteContent(deleteContentId)
    getAllContents().then(res => setContents(res)).catch((error) => console.error(error))
  }

  useEffect(() => {
    getAllContents().then(res => setContents(res)).catch((error) => console.error(error))
  }, [])

  return (
    <>
      <p>ToDoApp</p>
      <input type="textbox" value={text} onChange={handleTextChange} placeholder='コンテンツを入力'/>
      <button onClick={handlePostContent}>保存</button>
      <div>
        {contents.map(content => (
          <div key={content.id}>
            <input
              type="checkbox"
              checked={content.isDone}
              onChange={() => handleCheckboxChange(content.id)}
            />
            <input type="text"
                   value={content.content}
                   onChange={(e) => handleContentChange(content.id, e.target.value)}
            />
            <button onClick={() => handlePutContent(content)}>更新</button>
            <button onClick={() => handleDeleteContent(content.id)}>削除</button>
          </div>
        ))}
      </div>
    </>
  )
}