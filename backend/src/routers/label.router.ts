import { Router } from 'express';

import {
  addLabel,
  listLabels,
  listLabel,
  listLabelCards,
  updateLabel,
  removeLabel,
} from '../controllers/label.controller';

const labelRouter = Router({ mergeParams: true });

labelRouter.post('/', addLabel);
labelRouter.get('/', listLabels);
labelRouter.get('/:id', listLabel);
labelRouter.get('/:id/cards', listLabelCards);
labelRouter.patch('/:id', updateLabel);
labelRouter.delete('/:id', removeLabel);

export default labelRouter;
