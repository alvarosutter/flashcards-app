import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import getPrismaError from '../utils/prismaError.utils';
import { ILabel } from '../models/interfaces.models';

const prisma = new PrismaClient();

export const createLabel = async (req: Request, res: Response) => {
  try {
    const { labelName } = req.body as ILabel;

    const newLabel = await prisma.label.create({
      data: {
        labelName,
      },
    });

    return res.status(201).send({
      status: 'success',
      data: newLabel,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getLabels = async (_: Request, res: Response) => {
  try {
    const labels = await prisma.label.findMany({
      include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: labels.map((label) => ({
        ...label,
        cards: label.cards.map((element) => ({
          ...element.card,
          labels: element.card.labels.map((e) => e.label),
        })),
      })),
      total: labels.length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;

    const label = await prisma.label.findUniqueOrThrow({
      where: {
        labelId,
      },
      include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...label,
        cards: label.cards.map((element) => ({
          ...element.card,
          labels: element.card.labels.map((e) => e.label),
        })),
      },
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const getLabelCards = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;

    const label = await prisma.label.findUniqueOrThrow({
      where: {
        labelId,
      },
      include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    });

    return res.status(200).send({
      status: 'success',
      data: label.cards.map((element) => ({
        ...element.card,
        labels: element.card.labels.map((e) => e.label),
      })),
      total: label.cards.map((element) => element.card).length,
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const patchLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;
    const { labelName } = req.body as ILabel;

    const label = await prisma.label.update({
      where: {
        labelId,
      },
      include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
      data: {
        labelName,
      },
    });

    return res.status(200).send({
      status: 'success',
      data: {
        ...label,
        cards: label.cards.map((element) => ({
          ...element.card,
          labels: element.card.labels.map((e) => e.label),
        })),
      },
    });
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};

export const deleteLabel = async (req: Request, res: Response) => {
  try {
    const { labelId } = req.params;

    await prisma.label.delete({
      where: {
        labelId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    const prismaError = getPrismaError(error);
    return res.status(prismaError.statusCode).send({
      status: 'failure',
      message: prismaError.message,
    });
  }
};
