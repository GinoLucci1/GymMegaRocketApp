import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './admins.module.css';
import { getAdmins, deleteAdmin } from 'redux/admins/thunks';
import { Button, ModalAlert, SharedTable } from 'Components/Shared';
import LoadingSpinner from 'Components/Shared/LoadingSpinner/index';

function Admins() {
  const [modalText, setModalText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useSelector((state) => state.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onDelete = (id) => {
    dispatch(deleteAdmin(id, setModalText, setIsModalOpen));
  };

  return (
    <section className={styles.container} data-testid="superadmin-admins-section">
      <div className={styles.titleAdmin}>
        <h2>Admins</h2>
        <Link to="/super-admin/admins/form">
          <Button type="add" resource="admin" testId="add-button">
            Add Admin
          </Button>
        </Link>
      </div>
      {data.isLoading ? (
        <LoadingSpinner />
      ) : (
        <SharedTable
          data={data.list}
          handleDelete={onDelete}
          editLink="/super-admin/admins/form/"
          testId="superadmin-admins-table"
        />
      )}
      {isModalOpen && <ModalAlert text={modalText} onClick={closeModal} />}
    </section>
  );
}

export default Admins;
