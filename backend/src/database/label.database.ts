import { ILabel, IPatchLabel } from '../types/label';
import prisma from '../utils/prismaClient.utils';

const labelCreate = async (name: string): Promise<ILabel> => {
  const label = await prisma.label.create({
    data: {
      name,
    },
  });
  return label as ILabel;
};

const labelFind = async (id: string): Promise<ILabel> => {
  const label = await prisma.label.findUniqueOrThrow({
    where: {
      id,
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

const labelUpdate = async ({ id, name }: IPatchLabel): Promise<ILabel> => {
  const label = await prisma.label.update({
    where: { id },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    data: {
      name,
    },
  });
  return label as ILabel;
};

const labelDelete = async (id: string) => {
  await prisma.label.delete({
    where: {
      id,
    },
  });
};

export { labelCreate, labelFind, labelFindMany, labelUpdate, labelDelete };
