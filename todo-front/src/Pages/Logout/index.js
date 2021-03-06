import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodoAppContext } from '../../Context';
import { createLogout } from '../../Context/actions';

function Logout() {
  const { dispatch } = useTodoAppContext();
  const logout = createLogout(dispatch);
  const { state } = useTodoAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  useEffect(() => {
    if (!state.user.userHash) navigate('/');
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state.user]);
  return <></>;
}

export default Logout;
