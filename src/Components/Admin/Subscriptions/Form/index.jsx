import React, { useState, useEffect } from 'react';
import style from './form.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { ModalAlert, Button } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSubscription, editSubscription, getSubscriptionById } from 'redux/subscriptions/thunks';

const SubForm = () => {
  const { id } = useParams();
  const [membersData, setMembers] = useState([]);
  const [classesData, setClasses] = useState([]);
  const [filteredMembersData, setFilteredMembers] = useState([]);
  const [filteredClassesData, setFilteredClasses] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });
  const [formData, setFormData] = useState({
    classes: '',
    members: '',
    date: ''
  });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionById(id, setSelectedSubscription));
    }
  }, [id]);

  const getMembers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/member/`)
      .then((response) => response.json())
      .then((data) => {
        const memberData = data.data;
        setMembers(memberData);
      })
      .catch((error) => {
        setAlertText(error);
        setShowAlert(true);
      });
  };

  const getClasses = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/class/`)
      .then((response) => response.json())
      .then((data) => {
        const classesData = data.data;
        setClasses(classesData);
      })
      .catch((error) => {
        setAlertText(error);
        setShowAlert(true);
      });
  };

  useEffect(() => {
    getClasses();
    getMembers();
  }, []);

  useEffect(() => {
    setFormData({
      classes: selectedSubscription.classes,
      members: selectedSubscription.members,
      date: selectedSubscription.date
    });
    setFilteredClasses(classesData.filter((classe) => classe._id !== selectedSubscription.classes));
    setFilteredMembers(
      membersData.filter((member) => member._id !== selectedSubscription.members._id)
    );
  }, [selectedSubscription]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addSubscription(formData, setAlertText, setShowAlert));
    } else {
      dispatch(editSubscription(id, formData, setAlertText, setShowAlert));
    }
  };

  const handleFormClose = (e) => {
    e.preventDefault();
    history.push('/admin/subscriptions');
  };

  return (
    <>
      <div>
        <form className={style.form} onSubmit={onSubmit}>
          <div>
            <div className={style.forms}>
              <label className={style.label}>Member ID</label>
              {id ? (
                <select name="members" onChange={onChange}>
                  <option value={selectedSubscription.members._id}>
                    {selectedSubscription.members.firstName +
                      ' ' +
                      selectedSubscription.members.lastName}
                  </option>
                  {filteredMembersData.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              ) : (
                <select name="members" onChange={onChange}>
                  <option value={null}>Select a member</option>
                  {membersData.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstName} {member.lastName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className={style.forms}>
              <label className={style.label}>Date</label>
              <input name="date" type="date" value={formData.date} onChange={onChange} />
            </div>
            <div className={style.forms}>
              <label className={style.label}>Class ID</label>
              {id ? (
                <select value={selectedSubscription.classes} onChange={onChange}>
                  <option value={selectedSubscription.classes._id}>
                    {selectedSubscription.classes}
                  </option>
                  {filteredClassesData.map((classes) => (
                    <option key={classes._id} value={classes._id}>
                      {classes._id}
                    </option>
                  ))}
                </select>
              ) : (
                <select name="classes" onChange={onChange}>
                  <option value={null}>Choose Class</option>
                  {classesData.map((classes) => (
                    <option key={classes._id} value={classes._id}>
                      {classes._id}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className={style.buttons}>
            <Button type="submit" />
            <Button onClick={handleFormClose} type="cancel" />
          </div>
        </form>
        {showAlert && <ModalAlert text={alertText} onClick={handleFormClose} />}
      </div>
    </>
  );
};

export default SubForm;
