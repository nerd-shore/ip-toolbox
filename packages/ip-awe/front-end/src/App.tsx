import React, {useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce';

import { DomObject } from './DomObject';
import { aDomObject } from './aDomObject';
import Checkbox from './components/Checkbox';
import { updateAWS } from './updateAWS';

import './App.css';

const useDebounce = (callback: any, delay: number) => {
  return useCallback(
    debounce((...args: any) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
};

const STAGE_OPTIONS = [{
    title: "Publish to DEV",
    checked: true,
  }, {
    title: "Publish to QA",
    checked: false,
  }, {
    title: "Publish to PROD",
    checked: false,
  }];

const DRAFT_OPTIONS = [{ title: 'Draft', checked: false }];

const dropdownOptions = [
  {
    label: "---",
    value: "new",
  },
  {
    label: "Welcome Notification",
    value: "welcome",
  },
  {
    label: "Info Notification",
    value: "info",
  }
]

function App() {
  const [content, setContent] = useState<any>(aDomObject);
  const [contentEditable] = useState(true);
  const [file, setFile] = useState<any>(null);
  const [fileMetaData, setFileMetaData] = useState<any>({ type: '', name: '' });
  const [selectedDropDown, setSelectedDropDown] = useState(dropdownOptions[0].value);
  const debouncedSave = useDebounce(() => handleEditableContentChange(), 500);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [stagesCheckBox, setStagesCheckbox] = useState(STAGE_OPTIONS);
  const [draftCheckBox, setDraftCheckbox] = useState(DRAFT_OPTIONS);
  const [awsAki, setAwsAki] = useState('');
  const [awsSecret, setAwsSecret] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEditableContentChange = () => {
    const parser = new DOMParser();
    const editorial = contentRef.current;
    const doc = parser.parseFromString((editorial as any).innerHTML, 'text/html');
    const data = parseChildren(doc.body);
    console.log(data);
    return data;
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
      elementType: el.nodeName as any,
      value: el.firstChild?.nodeValue as string | null
    }
  };

  const handleDebounce = (evt: any) => {
    evt.preventDefault();
    debouncedSave();
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    getCaretCoordinates();
    getCaretIndex(contentRef.current);
    const link = isLink(selection?.focusNode);
    console.log('isLink', link);
  };

  const parseDomObject = (obj: DomObject, index: number) => {
    let elem: any = [];
    let childElements = null;
    if (obj.elements && obj.elements.length) {
      console.log(obj, index);
      childElements = obj.elements.map((i: any, k: number) => parseDomObject(i, k));
    }

    const key = `${obj.value}-${index}`;
    switch (obj.elementType) {
      case 'DIV':
        elem.push(<div key={key}>{obj.value}{childElements}</div>);
        break;
      case 'EM':
        elem.push(<em key={key}>{obj.value}{childElements}</em>);
        break;
      case 'I':
        elem.push(<i key={key}>{obj.value}{childElements}</i>);
        break;
      case 'STRONG':
        elem.push(<strong key={key}>{obj.value}{childElements}</strong>);
        break;
      case 'B':
        elem.push(<b key={key}>{obj.value}{childElements}</b>);
        break;
      case 'BR':
        elem.push(<br/>);
        break;
      case 'H3':
        elem.push(<h3 key={key}>{obj.value}{childElements}</h3>);
        break;
      case 'IMG':
        elem.push(<img key={key} src={obj?.attributes?.src} title={obj?.attributes?.title} alt={obj?.attributes?.alt}/>);
        break;
      case 'A':
        elem.push(<a key={key} href={obj?.attributes?.href} target={obj?.attributes?.target}>{obj.value}{childElements}</a>);
        break;
      default:
        break;
    }
    return elem;
  };

  const handleChange = (e: any) => {
    const fileData = URL.createObjectURL(e.target.files[0]);
    setFileMetaData({ type: e.target.files[0].type, name: e.target.files[0].name });
    setFile(fileData);
  };

  const wrapSelectedText = (type: string) => {
    const sText = document.getSelection();
    console.log(sText);
    document.execCommand(type);
    handleEditableContentChange();
  };

  const handleAddLink = () => {
    const linkURL = prompt('Enter a URL:', 'https://');
    const sText = document.getSelection();
    document.execCommand('insertHTML', false, `<a href="${linkURL}" target="_blank">${sText}</a>`);
    handleEditableContentChange();
  };


  const handleCheckboxChange = (type: string, changeEvent: any) => {
    const { name } = changeEvent.target;

    switch (type) {
      case 'stages': {
        const newStages = stagesCheckBox.map(o => {
          console.log(o.title, o.title === name);
          if (o.title === name) {
            return {
              ...o,
              checked: !o.checked
            }
          } else {
            return o
          }
        });
        setStagesCheckbox(newStages);
        break;
      }
      case 'draft': {
        const newDraft = draftCheckBox.map(o => {
          if (o.title === name) {
            return {
              ...o,
              checked: !o.checked
            }
          } else {
            return o
          }
        });
        setDraftCheckbox(newDraft);
        break;
      }
    }

  };

  const fetchData = (selection: string) => {
    if (selection !== 'new') {
      fetch(`http://localhost:4500/api/content/${selection}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setContent(data);
          setTimeout(() => setLoading(false), 300);
        });
    } else {
      setContent(aDomObject);
      setTimeout(() => setLoading(false), 300);
    }
  }

  const createCheckbox = (type: string, option: any) => (
    <Checkbox
      label={option.title}
      isSelected={option.checked}
      onCheckboxChange={(e: any) => handleCheckboxChange(type, e)}
      key={option.title}
    />
  );

  const handleSelectionChange = (e: any) => {
    setSelectedDropDown(e.target.value);
    setLoading(true);
    setTimeout(() => { fetchData(e.target.value) }, 300);
  };

  const handleSavingOfData = async () => {
    const data = handleEditableContentChange();
    const content = {
      content: data
    };
    await fetch(`http://localhost:4500/api/content/${selectedDropDown}`, { method: 'PUT', headers: [['Content-Type', 'application/json']], body: JSON.stringify(content) })
      .then(data => {
        console.log(data);
      });
    if (awsAki && awsSecret && awsAki.length && awsSecret.length) {
      await updateAWS(awsAki, awsSecret, fileMetaData.name, file, fileMetaData.type);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          NerdShore's: AWE
        </p>
      </header>
      <section className={'editor-section--top'}>
        <div className={'editor-section__left'}>
          <div>
            <select className={'editor-options'} value={selectedDropDown} onChange={handleSelectionChange}>
              {dropdownOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
          </div>
          <div className={'editor-buttons'}>
            <button onClick={() => wrapSelectedText('bold')}>Bold</button>
            <button onClick={() => wrapSelectedText('italic')}>Italic</button>
            <button onClick={handleAddLink}>Link</button>
            <label className={'editor-select'}>
              <span>Select Background Image</span>
              <input type="file" style={{visibility: 'hidden', display: 'none'}} onChange={handleChange} title={'image'}/>
            </label>
          </div>
        </div>
      </section>
      <section className={'editor-section--middle'}>
        <div className={'editor-wrapper'}>
          {
            loading ? <div className={'editor--loading'}> ... loading </div> : (
              <div className={'editor'} contentEditable={contentEditable} ref={contentRef} onKeyUp={handleDebounce} onMouseUp={handleMouseUp}>
                {content.map((i: any, k: number) => (parseDomObject(i, k)))}
              </div>
            )
          }
          {file ? (
            <div className={'editor-image-wrapper'}>
              <img src={file} title={'bla'} alt={'bla'} className={'editor-image'}/>
            </div>
            ) : null
          }
        </div>
      </section>
      <section className={'options-section'}>
        <div className={'options-section__left-wm'}>
          {stagesCheckBox.map(o => createCheckbox('stages', o))}
        </div>
        <div className={'options-section__middle'}>
          {draftCheckBox.map(o => createCheckbox('draft', o))}
        </div>
        <div className={'options-section__right-wm'}>
          <input type={'text'} placeholder={'Access Key ID'} onBlur={e => setAwsAki(e.target.value)}/>
          <input type={'password'} placeholder={'Secret Access Key'} onBlur={e => setAwsSecret(e.target.value)}/>
          <button onClick={handleSavingOfData}>Save</button>
        </div>
      </section>
    </div>
  );
}

function getCaretCoordinates() {
  let x = 0,
    y = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection?.rangeCount !== 0) {
      const range = selection?.getRangeAt(0).cloneRange();
      range?.collapse(true);
      const rect = range?.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  console.log('getCaretCoordinates', x, y);
  return { x, y };
}

function getCaretIndex(element: any) {
  let position: any = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection?.rangeCount !== 0) {
      const range = window?.getSelection()?.getRangeAt(0);
      const preCaretRange = range?.cloneRange();
      preCaretRange?.selectNodeContents(element);
      preCaretRange?.setEnd((range as any)?.endContainer, (range as any)?.endOffset);
      position = preCaretRange?.toString().length as number || 0;
    }
  }
  console.log('position', position);
  return position;
}

function isLink(selection: any): boolean | undefined {
  if (selection?.parentNode?.nodeName === 'A') {
    return true;
  } else if (selection?.parentNode.contentEditable === 'true') {
    return false;
  } else if (selection?.parentNode.contentEditable !== 'true') {
    return isLink(selection?.parentNode);
  }
}

export default App;
