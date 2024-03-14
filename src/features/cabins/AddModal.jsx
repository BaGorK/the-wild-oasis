import { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';

function AddModal() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal(!isOpenModal)}>
        Add new Cabin
      </Button>
      {isOpenModal && (
        <Modal onCloseModal={() => setIsOpenModal(!isOpenModal)}>
          <CreateCabinForm onCloseModal={() => setIsOpenModal(!isOpenModal)} />
        </Modal>
      )}
    </div>
  );
}

export default AddModal;
