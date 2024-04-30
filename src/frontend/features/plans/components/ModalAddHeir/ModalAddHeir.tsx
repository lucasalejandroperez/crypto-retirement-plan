import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { SecondaryButton } from '../../../../components/SecondaryButton/SecondaryButton';
import { PrimaryButton } from '../../../../components/PrimaryButton/PrimaryButton';
import { HeirParam } from '../../../../interfaces/plansInterfaces';
import { Input } from '../../../../components/Input/Input';
import './styles.scss';

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  acceptModal?: () => void;
  setNewHeir: (newHeir: HeirParam) => void;
}

export const ModalAddHeir = ({ modalIsOpen, closeModal, acceptModal, setNewHeir }: Props) => {
  Modal.setAppElement('#root');

  const customStyles = {
    content: {
      background: 'transparent',
      border: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNewHeir({ name, heirAddress: address });
    closeModal();
  };

  useEffect(() => {
    if (!modalIsOpen) {
      setAddress('');
      setName('');
    }
  }, [modalIsOpen]);

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="" style={customStyles}>
      <div className="add-heir-modal">
        <div className="background" />
        <h2>Add Heir</h2>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field-container">
            <label htmlFor="address">Address</label>
            <Input
              type="text"
              id="address"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="buttons-container">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            <PrimaryButton onClick={acceptModal}>Add</PrimaryButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};
