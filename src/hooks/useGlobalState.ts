import { hookstate, State } from '@hookstate/core';
import { GlobalState } from '../types/types';

let initalized: boolean = false;
let globalState: State<GlobalState>;

/**
 * This custom hook initializes the global state and
 * makes it available to the rest of the application
 *
 * It maintains two closure variables declared above
 *
 * It can be wrapped in another hook so that UI components
 * can access the global state, modify it and subscribe to
 * changes to the same.
 *
 * @returns {State<GlobalState>}
 */
const useGlobalState = () => {
  if (!initalized) {
    initalized = true;
    globalState = hookstate<GlobalState>({
      searchTerm: '',
      characters: [],
      selectedCharacter: null,
      isFetchingCharacters: false,
      featuredCharacters: [],
      fetchError: null,
    });
  }
  return globalState;
};

export default useGlobalState;
