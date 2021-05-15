import { render } from 'react-dom'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'


const $app = document.getElementById('app')

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState)

    return text.length
  },
})

render(<App />, $app)

function App () {
  return (
    <RecoilRoot>
      <Top>
        <CharacterCounter />
        <Wow1 />
        <Wow2 />
        <Wow3 />
      </Top>
    </RecoilRoot>
  )
}

function CharacterCounter () {
  console.log('CharacterCounter')
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  )
}

function TextInput () {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  )
}

function CharacterCount () {
  const count = useRecoilValue(charCountState)
  return <>Character Count: {count}</>
}

function Wow1 () {
  const [text] = useRecoilState(textState)
  console.log('wow1', text)
  return <div>text: {text}</div>
}

function Wow2 () {
  const [text] = useRecoilState(textState)
  console.log('wow2', text)
  return <div>text: {text}</div>
}

function Wow3 () {
  console.log('wow3', 123123)
  return <div>wow3</div>
}

function Top ({ children }) {
  const [text] = useRecoilState(textState)

  console.log('top', 111)

  return <div>
    <div>top: {text}</div>
    {children}
  </div>
}
