import React, { useState } from 'react';
import styles from './super-admins-table.module.css';

const Table = (props) => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEdit = (admin) => {
    props.editAdmin(admin);
  };

  const handleCancel = () => {
    setSelectedAdmin(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Admin?');
    if (confirmDelete) {
      props.deleteAdmin(id);
    }
  };

  const renderActions = (admin) => {
    if (selectedAdmin && selectedAdmin._id === admin._id) {
      return (
        <>
          <button onClick={() => props.handleUpdate(selectedAdmin)}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleEdit(admin)}>Edit</button>
          <button onClick={() => handleDelete(admin._id)}>Delete</button>
        </>
      );
    }
  };

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr className={styles.sAdmins}>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {props.data.map((admin) => (
          <tr className={styles.admins} key={admin._id}>
            <td>{admin.email}</td>
            <td>{renderActions(admin)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
