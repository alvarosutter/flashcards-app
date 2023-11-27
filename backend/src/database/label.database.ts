import { ILabel } from '../models/interfaces.models';
import { IPatchLabel } from '../types/interfaces';
import prisma from '../utils/prismaClient.utils';

const labelCreate = async (labelName: string): Promise<ILabel> => {
  const label = await prisma.label.create({
    data: {
      labelName,
    },
  });
  return label as ILabel;
};

const labelFind = async (labelId: string): Promise<ILabel> => {
  const label = await prisma.label.findUniqueOrThrow({
    where: {
      labelId,
    },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return label as ILabel;
};

const labelFindMany = async (): Promise<ILabel[]> => {
  const labels = await prisma.label.findMany({
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return labels as ILabel[];
};

const labelUpdate = async ({ labelId, labelName }: IPatchLabel): Promise<ILabel> => {
  const label = await prisma.label.update({
    where: { labelId },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    data: {
      labelName,
    },
  });
  return label as ILabel;
};

const labelDelete = async (labelId: string) => {
  await prisma.label.delete({
    where: {
      labelId,
    },
  });
};

export { labelCreate, labelFind, labelFindMany, labelUpdate, labelDelete };
