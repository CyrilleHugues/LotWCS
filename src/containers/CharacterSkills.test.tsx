import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as renderer from 'react-test-renderer';
import CharacterSkills from './CharacterSkills';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialStateFactory } from '../reducers/initial';
import { globalReducer } from '../reducers/global';
import { IStoreState } from '../types/state';

const store = createStore<IStoreState>(
  globalReducer,
  initialStateFactory()
);

describe('Testing the CharacterSkills container', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <CharacterSkills />
      </Provider>,
    div);
  });
});