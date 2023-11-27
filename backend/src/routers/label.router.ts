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
labelRouter.get('/:labelId', listLabel);
labelRouter.get('/:labelId/cards', listLabelCards);
labelRouter.patch('/:labelId', updateLabel);
labelRouter.delete('/:labelId', removeLabel);

export default labelRouter;
