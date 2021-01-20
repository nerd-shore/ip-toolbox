import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import logo from './ave_simple.jpg';
import { DomObject } from './DomObject';
import { aDomObject } from './aDomObject';

import './App.css';

const useDebounce = (callback: any, delay: number) => {
  return useCallback(
    debounce((...args: any) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
};

function App() {
  const [content, setContent] = useState<any>(aDomObject);
  const [focused, setFocused] = useState(false);
  const [contentEditable] = useState(true);
  const debouncedSave = useDebounce(() => handleEditableContentChange(), 500);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleEditableContentChange = () => {
    const parser = new DOMParser();
    const editorial = contentRef.current;
    const doc = parser.parseFromString((editorial as any).innerHTML, 'text/html');
    const data = parseChildren(doc.body);
    console.log(doc.body);

    console.log(data);

    setTimeout(() => setContent(data), 200);

    // setContent(data as any);
  }

  const parseChildren = (el: HTMLElement): DomObject[] | null => {
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

  const parseChildElement = (el: HTMLElement): DomObject => {
    let attributes: {[key in any]: any} | null = null;

    if (Object.keys(el.attributes).length) {
      attributes = {};
      Array.prototype.slice.call(el.attributes).forEach(item => {
        (attributes as any)[item.name] = item.value;
      });
    }

    return {
      attributes: attributes,
      elements: parseChildren((el as any)),
      elementType: el.localName as any,
      value: el.firstChild?.textContent as string | null
    }
  }

  const handleDebounce = (evt: any) => {
    evt.preventDefault();
    debouncedSave();
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
        elem.push(<img key={key} src={obj?.attributes?.src} title={obj?.attributes?.title} alt={obj?.attributes?.alt}/>);
        break;
      default:
        break;
    }
    return elem;
  }

  const handleFocus = () => {
    console.log('focused');
    if (focused) {
      handleEditableContentChange();
    }
    setFocused(!focused);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          NerdShore's IP-AWE (Awesome Wysiwyg Editor)
        </p>
        {
          focused ? (<div><button>B</button><button>I</button><button>Image</button></div>) : null
        }
        <div contentEditable={contentEditable} ref={contentRef} onFocus={handleFocus} onBlur={handleFocus}>
          {content ? content.map((i: any) => (parseDomObject(i))) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
