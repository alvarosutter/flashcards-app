import { Request, Response } from 'express';
import { createLabel, deleteLabel, getLabel, getLabelCards, getLabels, patchLabel } from '../services/label.service';
import { ILabel } from '../types/label';

const addLabel = async (req: Request, res: Response) => {
  try {
    const { labelName } = req.body as ILabel;

    const { statusCode, ...queryResult } = await createLabel(labelName);
    return res.status(statusCode ?? 201).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listLabels = async (_: Request, res: Response) => {
  try {
    const { statusCode, ...queryResult } = await getLabels();
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;

    const { statusCode, ...queryResult } = await getLabel(labelId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const listLabelCards = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;

    const { statusCode, ...queryResult } = await getLabelCards(labelId);
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const updateLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;
    const { labelName } = req.body as ILabel;

    const { statusCode, ...queryResult } = await patchLabel({ labelId, labelName });
    return res.status(statusCode ?? 200).send(queryResult);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

const removeLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;
    const { statusCode, ...queryResult } = await deleteLabel(labelId);
    if (statusCode) {
      return res.status(statusCode).send(queryResult);
    }
    return res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return res.status(500).send(errorMessage);
  }
};

export { addLabel, listLabels, listLabel, listLabelCards, updateLabel, removeLabel };
