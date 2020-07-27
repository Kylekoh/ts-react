import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Lotto from './Lotto';

const Hot = hot(Lotto); //HOC

ReactDOM.render(<Hot />, document.querySelector('#root'));
