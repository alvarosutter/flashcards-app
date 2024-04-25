import type { Label, PatchLabel } from '../types/label';
import prisma from '../utils/prismaClient.utils';

const labelCreate = async (name: string): Promise<Label> => {
  const label = await prisma.label.create({
    data: {
      name,
    },
  });
  return label as Label;
};

const labelFind = async (id: string): Promise<Label> => {
  const label = await prisma.label.findUniqueOrThrow({
    where: {
      id,
    },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return label as Label;
};

const labelFindMany = async (): Promise<Array<Label>> => {
  const labels = await prisma.label.findMany({
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
  });
  return labels as Array<Label>;
};

const labelUpdate = async ({ id, name }: PatchLabel): Promise<Label> => {
  const label = await prisma.label.update({
    where: { id },
    include: { cards: { select: { card: { include: { labels: { select: { label: true } } } } } } },
    data: {
      name,
    },
  });
  return label as Label;
};

const labelDelete = async (id: string) => {
  await prisma.label.delete({
    where: {
      id,
    },
  });
};

export { labelCreate, labelFind, labelFindMany, labelUpdate, labelDelete };
