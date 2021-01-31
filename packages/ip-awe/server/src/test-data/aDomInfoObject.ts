import { DomObject } from './DomObject';

export const aDomInfoObject: DomObject[] = [
  {
    attributes: {},
    elements: [
      {
        attributes: {},
        elements: null,
        elementType: 'STRONG',
        value: 'This is an info message',
      },
    ],
    elementType: 'DIV',
    value: '',
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
            elementType: 'BR',
            value: '',
          },
        ],
        elementType: 'B',
        value: '',
      },
    ],
    elementType: 'DIV',
    value: '',
  },
  {
    attributes: null,
    elements: [
      {
        attributes: null,
        elements: [
          {
            attributes: { target: '_blank', href: 'http://bla.com' },
            elements: [
              {
                attributes: null,
                elements: null,
                elementType: 'B',
                value: ' test link ',
              },
            ],
            elementType: 'A',
            value: '',
          },
        ],
        elementType: 'EM',
        value: ' hola ',
      },
    ],
    elementType: 'DIV',
    value: 'Feel free to edit me as well ',
  },
];
