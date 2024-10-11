import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {getAllContents, postContents, putContents} from "../repository/NetworkContentsRepository";
import {RequestContents, ResponseContents} from "../model/Contents";

export function InformationInput() {
  const [text, setText] = useState('')
  const [requestContents, setRequestContents] = useState<RequestContents>({content: ''})
  const [contents, setContents] = useState<ResponseContents[]>([])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const setAndGetContents = useCallback( async () => {
    const allContents = await getAllContents()
    setContents(allContents)
  }, [])

  const storeContents = async () => {
    const createContents: RequestContents = { content: text, isDone: false };
    setRequestContents(createContents);

    await postContents(createContents);

    await setAndGetContents()
  };

  const handleCheckboxChange = (id: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id ? { ...content, isDone: !content.isDone } : content
      )
    );
  };

  useEffect(() => {
    const getAllContents = async () => {
      await setAndGetContents();
    };
    getAllContents().catch((error) => {
      console.error('Error発生', error);
    });
  }, []);

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
            <label>
              <input
                type="checkbox"
                checked={valueObj.isDone}
                onChange={() => handleCheckboxChange(valueObj.id)}
              />
              {valueObj.content}
            </label>
            <button onClick={() => putContents(valueObj)}>更新</button>
          </div>
      ))}
    </div>
</>
)
}