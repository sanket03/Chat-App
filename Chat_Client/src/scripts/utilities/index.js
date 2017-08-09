import React from 'react';
import {render} from 'react-dom';
import store from '../utilities/store';
import {Provider} from 'react-redux';
import App from '../containers/app.jsx';
import '../../styles/app.scss';

render(<Provider store = {store}>
                <App/>
       </Provider>,
       document.getElementById('app'));