import * as LabelDatabase from '../../database/label.database';
import { labelData } from '../helper.tests';
import { createLabel, deleteLabel, getLabel, getLabelCards, getLabels, patchLabel } from '../../services/label.service';
import { IQueryResult } from '../../types/interfaces';
import { mapLabelCards } from '../../utils/mapCards.utils';

describe('Create Label', () => {
  describe('Given all is working correctly', () => {
    it('should create a new label', async () => {
      const input = {
        labelName: 'my label',
      };
      const label = {
        ...labelData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, ...input },
      };

      jest.spyOn(LabelDatabase, 'labelCreate').mockResolvedValueOnce(label);
      const result: IQueryResult = await createLabel(input.labelName);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Label', () => {
  describe('Given all is working correctly', () => {
    it('should get the label', async () => {
      const input = {
        labelId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };
      const label = {
        ...labelData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, cards: mapLabelCards(labelData.cards), ...input },
      };

      jest.spyOn(LabelDatabase, 'labelFind').mockResolvedValueOnce(label);
      const result: IQueryResult = await getLabel(input.labelId);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Label Cards', () => {
  describe('Given all is working correctly', () => {
    it('should get the label cards', async () => {
      const input = {
        labelId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };
      const label = {
        ...labelData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        total: label.cards.length,
        data: mapLabelCards(labelData.cards),
      };

      jest.spyOn(LabelDatabase, 'labelFind').mockResolvedValueOnce(label);
      const result: IQueryResult = await getLabelCards(input.labelId);
      expect(result).toEqual(expected);
    });
  });
});

describe('Get Labels', () => {
  describe('Given all is working correctly', () => {
    it('should return all the labels', async () => {
      const labels = [labelData];
      const expected: IQueryResult = {
        status: 'success',
        total: labels.length,
        data: labels.map((label) => ({
          ...label,
          cards: mapLabelCards(label.cards),
        })),
      };

      jest.spyOn(LabelDatabase, 'labelFindMany').mockResolvedValueOnce(labels);
      const result: IQueryResult = await getLabels();
      expect(result).toEqual(expected);
    });
  });
});

describe('Patch Label', () => {
  describe('Given all is working correctly', () => {
    it('should update the label', async () => {
      const input = {
        labelId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
        labelName: 'my label',
        archived: true,
      };
      const label = {
        ...labelData,
        ...input,
      };
      const expected: IQueryResult = {
        status: 'success',
        data: { ...labelData, cards: mapLabelCards(labelData.cards), ...input },
      };

      jest.spyOn(LabelDatabase, 'labelUpdate').mockResolvedValueOnce(label);
      const result: IQueryResult = await patchLabel(input);
      expect(result).toEqual(expected);
    });
  });
});

describe('Delete Label', () => {
  describe('Given all is working correctly', () => {
    it('should delete the label', async () => {
      const input = {
        labelId: '07d840a2-0dec-4fdb-862d-ccb3536fbde8',
      };

      const expected: IQueryResult = {
        status: 'success',
      };

      jest.spyOn(LabelDatabase, 'labelDelete').mockResolvedValueOnce();
      const result: IQueryResult = await deleteLabel(input.labelId);
      expect(result).toEqual(expected);
    });
  });
});
