import { useEffect, useState } from 'react';
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

function LabelPage() {
  const { array: labels, set, sort } = useArray([]);
  const [sortValue, setSortValue] = useLocalStorage('label-sort', {
    label: sortOptions[0].label,
    value: sortOptions[0].value,
  });
  const [showEmpty, setShowEmpty] = useLocalStorage('show-empty', true);
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

  useEffect(() => {
    fetchLabels().then(() => {
      setLoading(false);
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
                setSortValue(value);
                sortLabels(value as Option);
              },
            }}
            filterItems={{
              name: 'Empty',
              value: showEmpty,
              onClick: (value) => {
                setShowEmpty(value);
              },
            }}
            addItem={() => setAddLabelVisible(true)}
          />
          <LabelGallery
            labels={showEmpty ? (labels as Label[]) : (labels as Label[]).filter((label) => label.cards?.length !== 0)}
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
            <AddLabelForm
              onSubmitForm={() => {
                setAddLabelVisible(false);
                fetchLabels();
              }}
            />
          </Modal>
          <Modal
            title="Edit Label"
            isOpen={!!editLabel}
            onCancel={() => {
              setEditLabel(null);
            }}
          >
            <EditLabelForm
              onSubmitForm={() => {
                setEditLabel(null);
                fetchLabels();
              }}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
              onSubmitForm={() => {
                setDeleteLabel(null);
                fetchLabels();
              }}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
