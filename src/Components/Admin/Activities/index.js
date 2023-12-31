import React, { useEffect, useState } from 'react';
import styles from './activities.module.css';
import { Link } from 'react-router-dom';
import { Button, SharedTable, ModalAlert } from '../../Shared';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, deleteActivity } from '../../../redux/activities/thunks';
import LoadingSpinner from 'Components/Shared/LoadingSpinner/index';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const { list, isLoading } = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const deleteItem = (_id) => {
    dispatch(deleteActivity(_id, setModalText));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.container} data-testid="admin-activities-section">
        <div className={styles.titleActivities}>
          <h2>Activities</h2>
          <Link to="/admin/activities/ActivitiesForm">
            <Button type="add" resource="Activity" testId="add-button" />
          </Link>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SharedTable
            data={list}
            editLink={'/admin/activities/ActivitiesForm/'}
            handleDelete={deleteItem}
            testId="admin-activities-table"
          />
        )}
      </section>
      {showModal && <ModalAlert text={modalText} onClick={closeModal} />}
    </>
  );
};

export default Activities;
