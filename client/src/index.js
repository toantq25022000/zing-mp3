import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import GlobalStyles from './components/GlobalStyles';
import { store } from './redux/store';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    // </React.StrictMode>
    <Provider store={store}>
        <SkeletonTheme baseColor="rgba(0, 0, 0, 0.05)" highlightColor="#fff">
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </SkeletonTheme>
    </Provider>,
);
