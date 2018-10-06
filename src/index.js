import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import MemoryGame from './components/memoryGame';
import './styles/styles.css';

render(
    <Provider store={store}>
        <MemoryGame />
    </Provider>,
    document.getElementById('app')
);
