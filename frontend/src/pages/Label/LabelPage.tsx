import { useEffect, useState } from 'react';
import DashboardBar from '../../components/ui/DashboardBar';
import useArray from '../../hooks/useArray';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Label, sortOptions } from '../../services/Flashcards/flashcardsUtils';
import { Option } from '../../components/ui/Select';
import useLoader from '../../hooks/useLoader';
import { getLabels } from '../../services/Flashcards/label.services';
import LabelGallery from './Components/LabelGallery';
import Modal from '../../components/ui/Modal';
import AddLabelForm from './Components/AddLabelForm';

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
          <p>{editLabel?.labelName}</p>
          <p>{deleteLabel?.labelName}</p>
        </>
      )}
    </>
  );
}

export default LabelPage;
