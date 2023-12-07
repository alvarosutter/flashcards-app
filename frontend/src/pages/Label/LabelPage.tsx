import { useCallback, useEffect, useState } from 'react';
import DashboardBar from '../../components/dashboard/DashboardBar';
import { useArray, useLoader, useLocalStorage } from '../../hooks';
import { Label, sortOptions } from '../../services/Flashcards/flashcardsUtils';
import { Option } from '../../components/dashboard/Select';
import { getLabels } from '../../services/Flashcards/label.services';
import LabelGallery from './Components/LabelGallery';
import Modal from '../../components/ui/Modal';
import AddLabelForm from './Components/AddLabelForm';
import EditLabelForm from './Components/EditLabelForm';
import DeleteLabelForm from './Components/DeleteLabelForm';
import Cards from '../Card/Cards';

interface ILabelsArray {
  array: Label[];
  set: React.Dispatch<React.SetStateAction<Label[]>>;
  sort: (callback: (a: Label, b: Label) => number) => void;
}

function LabelPage() {
  const { array: labels, set, sort } = useArray([]) as ILabelsArray;
  const [sortValue, setSortValue] = useLocalStorage('label-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  }) as [Option, React.Dispatch<React.SetStateAction<Option>>];
  const [showEmpty, setShowEmpty] = useLocalStorage('show-empty', true) as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ];
  const [addLabelVisible, setAddLabelVisible] = useState(false);
  const [editLabel, setEditLabel] = useState<Label | null>(null);
  const [deleteLabel, setDeleteLabel] = useState<Label | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const { isLoading, setLoading, getLoader } = useLoader();

  function sortLabels(sortOption: Option) {
    const option = sortOptions.filter((o) => o.value === sortOption?.value);
    sort(option[0].func);
  }

  async function fetchLabels() {
    const data = await getLabels();
    set(data);
    sortLabels(sortValue);
  }

  const handleOnSubmitAddLabel = useCallback(async () => {
    setAddLabelVisible(false);
    await fetchLabels();
  }, [setAddLabelVisible]);

  const handleOnSubmitEditLabel = useCallback(async () => {
    setEditLabel(null);
    await fetchLabels();
  }, [setEditLabel]);

  const handleOnSubmitDeleteLabel = useCallback(async () => {
    setDeleteLabel(null);
    await fetchLabels();
  }, [setDeleteLabel]);

  useEffect(() => {
    fetchLabels()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        throw Error('Error when fetching data');
      });
  }, []);

  return (
    <>
      {selectedLabel && <Cards item={selectedLabel} goBack={() => setSelectedLabel(null)} />}
      {isLoading && getLoader()}
      {!isLoading && !selectedLabel && (
        <>
          <DashboardBar
            title="Labels"
            sortItems={{
              options: sortOptions.map((option) => ({
                label: option.label,
                value: option.value,
              })),
              defaultOption: sortValue,
              onChange: (value) => {
                setSortValue(value as Option);
                sortLabels(value as Option);
              },
            }}
            filterItems={{
              name: 'Empty',
              value: showEmpty as boolean,
              onClick: (value) => {
                setShowEmpty(value);
              },
            }}
            addItem={() => setAddLabelVisible(true)}
          />
          <LabelGallery
            labels={showEmpty ? labels : labels.filter((label) => label.cards?.length !== 0)}
            setEditLabel={setEditLabel}
            setDeleteLabel={setDeleteLabel}
            setSelectedLabel={setSelectedLabel}
          />
          <Modal
            title="Add Label"
            isOpen={addLabelVisible}
            onCancel={() => {
              setAddLabelVisible(false);
            }}
          >
            <AddLabelForm onSubmitForm={handleOnSubmitAddLabel} />
          </Modal>
          <Modal
            title="Edit Label"
            isOpen={!!editLabel}
            onCancel={() => {
              setEditLabel(null);
            }}
          >
            <EditLabelForm
              onSubmitForm={handleOnSubmitEditLabel}
              label={editLabel!}
              onCancel={() => {
                setEditLabel(null);
              }}
            />
          </Modal>
          <Modal
            title="Delete Label"
            isOpen={!!deleteLabel}
            onCancel={() => {
              setDeleteLabel(null);
            }}
          >
            <DeleteLabelForm
              onSubmitForm={handleOnSubmitDeleteLabel}
              label={deleteLabel!}
              onCancel={() => {
                setDeleteLabel(null);
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
}

export default LabelPage;
