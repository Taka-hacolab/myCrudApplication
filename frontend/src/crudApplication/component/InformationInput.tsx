import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {deleteContents, getAllContents, postContents, putContents} from "../repository/NetworkContentsRepository";
import {RequestContents, ResponseContents} from "../model/Contents";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export function InformationInput() {
  const [text, setText] = useState('')
  const [requestContents, setRequestContents] = useState<RequestContents>({content: ''})
  const [contents, setContents] = useState<ResponseContents[]>([])

  useEffect(() => {
    getAllContents().then(res => setContents(res)).catch((error) => console.error(error))
  }, [])


  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const setAndGetContents = useCallback(async () => {
    const allContents = await getAllContents()
    setContents(allContents)
  }, [])

  const storeContents = async () => {
    const createContents: RequestContents = {content: text, isDone: false};
    setRequestContents(createContents);

    await postContents(createContents);

    await setAndGetContents()
  };

  const handleCheckboxChange = (id: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? {...content, isDone: !content.isDone} : content
      )
    );
  };

  const handleContentChange = (id: number, newContent: string) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? {...content, content: newContent} : content
      )
    );
  };

  const handlePutContent = async ( updateContent: RequestContents) => {
    await putContents(updateContent)
    await setAndGetContents()
  }

  const handleDeleteContent = async ( deleteContentId: Number) => {
    await deleteContents(deleteContentId)
    await setAndGetContents()
  }

  // TODO （１）テキスト内容を編集できるようにすること
  // TODO （２）チェックが入るたびにPUTの処理が働くように修正
  return (
    <>
      <p>ToDoApp</p>
      <input type="textbox" value={text} onChange={handleTextChange} placeholder='コンテンツを入力'/>
      <button onClick={storeContents}>保存</button>
      <div>
        {contents && contents.map(valueObj => (
          <div key={valueObj.id}>
            <input
              type="checkbox"
              checked={valueObj.isDone}
              onChange={() => handleCheckboxChange(valueObj.id)}
            />
            <input type="text"
                   value={valueObj.content}
                   onChange={(e) => handleContentChange(valueObj.id, e.target.value)}
            />
            <button onClick={() => handlePutContent(valueObj)}>更新</button>
            <button onClick={() => handleDeleteContent(valueObj.id)}>削除</button>
          </div>
        ))}
      </div>
    </>
  )
}