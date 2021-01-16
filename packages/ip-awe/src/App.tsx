import React, {useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce';
import logo from './ave_simple.jpg';

import './App.css';

interface DomObject {
  elementType: 'div' | 'strong' | 'img' | 'em' | 'h1' | 'h2' | 'h3' | 'br';
  value: string;
  elements?: DomObject[],
  attributes?: {
    src: string;
    title: string;
  }
}

const testDomObject: DomObject[] = [
  {
    elementType: 'div',
    value: 'Test',
    elements: [
      {
        elementType: 'strong',
        value: 'string'
      }
    ]
  },
  {
    elementType: 'em',
    value: '↵',
    elements: [{
      elementType: 'br',
      value: ''
    }]
  },
  {
    elementType: 'div',
    value: '',
    elements: [
      {
        elementType: 'em',
        value: 'hello',
      },
      {
        elementType: 'img',
        value: 'hello',
        attributes: { src: 'https://test.com', title: 'hello image'}
      },
      {
        elementType: 'h3',
        value: 'h3'
      },
    ]
  }
];

const useDebounce = (callback: any, delay: number) => {
  return useCallback(
    debounce((...args: any) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
};

function App() {
  const [content, setContent] = useState(testDomObject);
  const [contentEditable, setContentEditable] = useState(true);
  const debouncedSave = useDebounce((nextValue: any) => handleEditableContentChange(nextValue), 500);
  const contentRef = useRef<HTMLDivElement | null>(null)

  const handleEditableContentChange = (target: any) => {
    const editorial = contentRef.current;
    console.log('////', (editorial as any));
    console.log('////', (editorial as any).firstChild);
    console.log('////', (editorial as any).children);
    const data = parseChildren((editorial as any));

    console.log('##########', data);
  }

  const parseChildren = (el: HTMLElement) => {
    if (el.children && el.children.length) {
      const element: any = [];
      Object.keys(el?.children || {}).forEach((i, v) => {
        element.push(parseChildElement(el.children[v] as any));
      });

      return element;
    } else {
      return null;
    }
  }

  const parseChildElement = (el: HTMLElement) => {
    return {
      type: el.localName,
      value: el.innerText,
      attributes: el.attributes,
      children: parseChildren((el as any))
    }
  }

  const handleDebounce = (evt: any) => {
    evt.preventDefault();
    debouncedSave(evt.target);
  }

  const parseDomObject = (obj: DomObject) => {
    console.log(obj);
    let elem: any = [];
    let children = null;
    if (obj.elements && obj.elements.length) {
      children = obj.elements.map(i => parseDomObject(i));
    }
    const key = Math.random();

    switch (obj.elementType) {
      case 'div':
        elem.push(<div key={key}>{obj.value}{children}</div>);
        break;
      case 'em':
        elem.push(<em key={key}>{obj.value}{children}</em>);
        break;
      case 'strong':
        elem.push(<strong key={key}>{obj.value}{children}</strong>);
        break;
      case 'br':
        elem.push(<br/>);
        break;
      case 'h3':
        elem.push(<h3 key={key}>{obj.value}{children}</h3>);
        break;
      case 'img':
        elem.push(<img key={key} src={obj?.attributes?.src} title={obj?.attributes?.title} alt={obj?.attributes?.title}/>);
        break;
      default:
        break;
    }
    return elem;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          NerdShore's IP-AWE (Awesome Wysiwyg Editor)
        </p>
        <div contentEditable={contentEditable} onKeyUp={handleDebounce} ref={contentRef}>
          {content.map(i => (parseDomObject(i)))}
        </div>
      </header>
    </div>
  );
}

export default App;
