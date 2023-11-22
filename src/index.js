import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

function* fetchPlants() {
  try {
      const response = yield axios.get('/api/plant');
      const action = { type: 'SET_PLANTS', payload: response.data}
      yield put(action);
  } catch (error) {
    console.log('Error fetching plants', error);
    alert('Something went wrong!');
  }
}

function* addPlant(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({type: 'FETCH_PLANTS'})
  } catch (error) {
    console.log('Error adding plant', error)
    alert('Something went wrong!');
  }
}

function* deletePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`)
    yield put({type: 'FETCH_PLANTS'})

  } catch (error) {
    console.log('Error with delete', error)
    alert('Something went wrong!')
  }
}



function* rootSaga() {
  yield takeEvery('FETCH_PLANTS', fetchPlants);
  yield takeEvery('ADD_PLANT', addPlant);
  yield takeEvery('DELETE_PLANT', deletePlant);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ 
    plantList 
  }),
  applyMiddleware(sagaMiddleware, logger),
);



sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);