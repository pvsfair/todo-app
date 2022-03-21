import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CaretDownIcon } from '../../Assets';
import { useTodoAppContext } from '../../Context';
import s from './styles.module.scss';

export default function Header() {
  const { state } = useTodoAppContext();
  const navigate = useNavigate();
  return (
    <div className={s.Header}>
      <span>ToDo List</span>
      <div className={s.ActionGroup}>
        {state.user.displayName && (
          <>
            <span>{state.user.displayName}</span>
            <span className={s.Action}>
              <CaretDownIcon />
            </span>
            <div className={s.Dropdown}>
              <span onClick={() => navigate('/logout')}>Logout</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
