import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    // </React.StrictMode>
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
);
