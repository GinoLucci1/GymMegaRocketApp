import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './form.module.css';

import { schema } from './adminFormValidations';
import { ModalAlert, Button, Input } from 'Components/Shared';
import { getByIdAdmins, editAdmin, addAdmin } from 'redux/admins/thunks';

const AdminsForm = ({ history }) => {
  const [modal, setModal] = useState(false);
  const [modalDone, setModalDone] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const data = useSelector((state) => state.admins);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: data.item?.firstName || '',
      lastName: data.item?.lastName || '',
      dni: data.item?.dni || '',
      phone: data.item?.phone || '',
      email: data.item?.email || '',
      city: data.item?.city || '',
      password: data.item?.password || ''
    }
  });

  useEffect(() => {
    console.log(data.item);
    if (id) {
      dispatch(getByIdAdmins(id));
      setText('Edit admin');
    } else {
      data.item = {};
      setText('Add admin');
    }
  }, [id]);

  useEffect(() => {
    if (data.item) {
      reset({
        firstName: data.item?.firstName || '',
        lastName: data.item?.lastName || '',
        dni: data.item?.dni || '',
        phone: data.item?.phone || '',
        email: data.item?.email || '',
        city: data.item?.city || '',
        password: data.item?.password || ''
      });
    }
  }, [data.item]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const switchModal = (error, msg) => {
    if (error) {
      setMsg(msg);
      setModal(!modal);
    } else {
      setMsg(msg);
      setModalDone(!modalDone);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (text === 'Add admin') {
        dispatch(addAdmin(data, switchModal));
      } else {
        if (data.password === '') {
          dispatch(
            editAdmin(
              id,
              {
                firstName: data.firstName,
                lastName: data.lastName,
                dni: data.dni,
                phone: data.phone,
                email: data.email,
                city: data.city
              },
              switchModal
            )
          );
        } else {
          dispatch(
            editAdmin(
              id,
              {
                firstName: data.firstName,
                lastName: data.lastName,
                dni: data.dni,
                phone: data.phone,
                email: data.email,
                city: data.city,
                password: data.password
              },
              switchModal
            )
          );
        }
      }
    } catch (error) {
      switchModal(true, error);
    }
  };

  const onInvalid = (errors) => console.log(errors);

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        data-testid="admin-form"
      >
        <div className={styles.formContainer}>
          <h1>{text}</h1>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="First Name"
              className={styles.input}
              name="firstName"
              type="text"
              placeholder="Enter first name"
              error={errors.firstName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Last Name"
              className={styles.input}
              name="lastName"
              type="text"
              placeholder="Enter last name"
              error={errors.lastName?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="DNI"
              className={styles.input}
              name="dni"
              type="number"
              placeholder="Enter DNI"
              error={errors.dni?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Phone"
              className={styles.input}
              name="phone"
              type="number"
              placeholder="Enter phone number"
              error={errors.phone?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="Email"
              className={styles.input}
              name="email"
              type="text"
              placeholder="Enter email address"
              error={errors.email?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              labelText="City"
              className={styles.input}
              name="city"
              type="text"
              placeholder="Enter city"
              error={errors.city?.message}
              register={register}
            />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <div className={styles.password}>
              <Input
                labelText="Password"
                className={styles.input}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                error={errors.password?.message}
                register={register}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.showPasswordIcon}
                onClick={togglePassword}
              />
            </div>
          </fieldset>
        </div>
        <div className={styles.btnForm}>
          <Button type="submit" resource="Admin" testId="submit-button" />
          <Button
            type="cancel"
            onClick={() => history.push('/super-admin/admins')}
            testId="cancel-button"
          />
          <Button
            className={styles.addButton}
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              reset();
            }}
            testId="reset-button"
          />
        </div>
        {modal && <ModalAlert text={msg} onClick={() => setModal(!modal)} />}
        {modalDone && <ModalAlert text={msg} onClick={() => history.push('/super-admin/admins')} />}
      </form>
    </div>
  );
};

export default AdminsForm;
