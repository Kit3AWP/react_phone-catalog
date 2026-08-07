import { useState } from 'react';
import React from 'react';
import styles from './CustomSelect.module.scss';
import classNames from 'classnames';

interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
}

export const CustomSelect = ({ label, options, value }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.selectContainer}>
      <p className={styles.label}>{label}</p>

      <button
        type="button"
        className={classNames(styles.trigger, {
          [styles.triggerActive]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.currentValue}>{value}</span>

        <div
          className={classNames(styles.downArrowIcon, {
            [styles.rotated]: isOpen,
          })}
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map(option => (
            <li
              key={option}
              className={classNames(styles.option, {
                [styles.selected]: option === value,
              })}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
