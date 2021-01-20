import { DomObject } from './DomObject';

export const aDomObject: DomObject[] = [
  {
    attributes: {},
    elements: [
      {
        attributes: {},
        elements: null,
        elementType: 'strong',
        value: 'STRONG'
      }
    ],
    elementType: 'div',
    value: 'Test'
  },
  {
    attributes: {},
    elements: [
      {
        attributes: {},
        elements: [
          {
            attributes: {},
            elements: null,
            elementType: 'br',
            value: ''
          }
        ],
        elementType: 'strong',
        value: ''
      }
    ],
    elementType: 'div',
    value: ''
  },
  {
    attributes: null,
    elements: [
      {
        attributes: null,
        elements: null,
        elementType: 'br',
        value: ''
      }
    ],
    elementType: 'em',
    value: ''
  },
  {
    attributes: null,
    elements: [
      {
        attributes: null,
        elements: null,
        elementType: 'em',
        value: 'hello'
      },
      {
        attributes: {
          src: 'https://test.com',
          title: 'hello title',
          alt: 'hello alt'
        },
        elements: null,
        elementType: 'img',
        value: ''
      },
      {
        attributes: {},
        elements: null,
        elementType: 'h3',
        value: 'LULULU'
      }
    ],
    elementType: 'div',
    value: 'hello'
  }
];
