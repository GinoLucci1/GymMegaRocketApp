import React from 'react';
import styles from './input.module.css';

const Input = ({ labelText, type, name, value, onChange, error, placeholder, register }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{labelText}</label>
      <input
        className={styles.input}
        {...register(name)}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
      {error && <p className={styles.errorMessage}> {error} </p>}
    </div>
  );
};

export default Input;
