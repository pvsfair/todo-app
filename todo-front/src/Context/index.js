import React, { createContext, useContext, useReducer } from 'react';

import { initialValues } from './helpers';
import { reducer } from './reducer';

const TodoAppContext = createContext({
  state: {},
  dispatch: () => {},
});

function TodoAppProvider({ children, value }) {
  const [state, dispatch] = useReducer(reducer, value ?? initialValues);

  return (
    <TodoAppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoAppContext.Provider>
  );
}

function useOrderCreationContext() {
  const context = useContext(TodoAppContext);
  return context;
}

export { TodoAppProvider, useOrderCreationContext };
