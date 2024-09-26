import {ChangeEvent, useEffect, useState} from "react";
import {getAllContents, postContents, putContents} from "../repository/NetworkContentsRepository";
import {RequestContents, ResponseContents} from "../model/Contents";

export function InformationInput() {
  const [text, setText] = useState('')
  const [requestContents, setRequestContents] = useState<RequestContents>({content: ''})
  const [contents, setContents] = useState<ResponseContents[]>([])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const setAndGetContents = async () => {
    const allContents = await getAllContents()
    setContents(allContents)
  }

  const storeContents = async () => {
    const createContents: RequestContents = { content: text, status:'notFinished' };
    setRequestContents(createContents);

    await postContents(createContents);

    await setAndGetContents()
  };

  const handleCheckboxChange = (id: number) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === id
          ? {
            ...content,
            status: content.status === 'finished' ? 'notFinished' : 'finished',
          }
          : content
      )
    );
  };

  //TODO viewからputContentsを実行する仕組みを考える

  useEffect(() => {
    getAllContents().then((data) => {
      setContents(data)
    })
  }, []);

  return (
    <>
      <p>ToDoApp</p>
      <input type="textbox" value={text} onChange={handleTextChange} placeholder='コンテンツを入力'/>
      <button onClick={storeContents}>保存</button>
      <div>
        {contents.map((valueObj, index) => (
          <div key={valueObj.id}>
            <label>
              <input
                type="checkbox"
                checked={valueObj.status === 'finished'}
                onChange={() => handleCheckboxChange(valueObj.id)}
              />
              {valueObj.content}
            </label>
          </div>
          // <p key={index}>{valueObj.content}</p>
      ))}
    </div>
</>
)
}