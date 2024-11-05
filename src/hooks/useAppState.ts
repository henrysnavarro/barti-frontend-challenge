'use client';

import { useHookstate } from '@hookstate/core';
import useGlobalState from './useGlobalState';

/**
 * This custom hook returns a proxy to the global state that
 * can be subscribed to by UI components. It wraps the global
 * state returned by the useGlobalState hook in a hookstate
 * proxy.
 *
 * Per the hookstate documentation, returning the app state
 * from useHookState gives access to the state variables in a
 * publish/subscribe model.  The state variables can then be
 * read or modified and other components can subscribe to the
 * changes by using this hook.
 *
 * @returns {State<GlobalState>} A proxy to the global state
 */
const useAppState = () => {
  const globalState = useGlobalState();
  const appState = useHookstate(globalState);

  return appState;
};

export default useAppState;
