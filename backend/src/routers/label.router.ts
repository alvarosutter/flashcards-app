import { Router } from 'express';
import {
  createLabel,
  deleteLabel,
  getLabel,
  getLabelCards,
  getLabels,
  patchLabel,
} from '../controllers/label.controller';

const labelRouter = Router({ mergeParams: true });

labelRouter.post('/', createLabel);
labelRouter.get('/', getLabels);
labelRouter.get('/:labelId', getLabel);
labelRouter.get('/:labelId/cards', getLabelCards);
labelRouter.patch('/:labelId', patchLabel);
labelRouter.delete('/:labelId', deleteLabel);

export default labelRouter;
