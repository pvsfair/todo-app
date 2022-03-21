import { TodoAppActionTypes } from './types';

export function reducer(state, { type, value }) {
  switch (type) {
    case TodoAppActionTypes.setLoginError:
      return { ...state, loginError: value };
    case TodoAppActionTypes.setRegisterSucess:
      return { ...state, registerSuccess: value };
    case TodoAppActionTypes.setRegisterErrors:
      return { ...state, registerErrors: value };
    case TodoAppActionTypes.setUser:
      return { ...state, user: { ...value } };
    case TodoAppActionTypes.setProjects:
      return { ...state, projects: [...value] };
    case TodoAppActionTypes.createProject:
      return { ...state, projects: [...state.projects, { ...value }] };
    default:
      return state;
  }
}
