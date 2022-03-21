import React from 'react';
import { CaretDownIcon } from '../../Assets';
import { useOrderCreationContext } from '../../Context';
import s from './styles.module.scss';

export default function Header() {
  const { state } = useOrderCreationContext();

  return (
    <div className={s.Header}>
      <span>ToDo List</span>
      <div>
        <span>{state.user.displayName}</span>
        <span className={s.Action}>
          <CaretDownIcon />
        </span>
      </div>
    </div>
  );
}
