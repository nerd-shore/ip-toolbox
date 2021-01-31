import { Request, Response } from 'express';

import { aDomInfoObject } from '../test-data/aDomInfoObject';
import { aDomWelcomeObject } from '../test-data/aDomWelcomeMessage';

const content = {
  info: aDomInfoObject,
  welcome: aDomWelcomeObject,
};

export const getContent = (req: Request, res: Response) => {
  res.status(200).send(content[req.params.name]);
};

export const putContent = (req: Request, res: Response) => {
  const data = req.body;
  const name = req.params.name;

  content[name] = data.content;

  res.status(201).send();
};
