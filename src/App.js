import React, {Component} from 'react';
import MyRoutes from './config/routes'
import { Provider } from 'react-redux';
import store from './store'
import {libray} from '@fortawsome/fontawsome-svg-core'

import {
  faStar, faHeart, faPhone, faEnvelope, faSearch, faUtensils,
  faThumbsUp, faSortAlphaDown, faUserMinus, faDollerSign, faAngleDoubleRight, faPlus,
  faConciergeBell, faCommentAlt, faInfoCircle, faShopppingBasket, faTimes, faSpinner, faTruck, faTasks,
} from '@fortawsome/free-solid-svg-icons';

libray.add(faStar, faHeart, faPhone, faEnvelope, faSearch, faUtensils,
  faThumbsUp, faSortAlphaDown, faUserMinus, faDollerSign, faAngleDoubleRight, faPlus,
  faConciergeBell, faCommentAlt, faInfoCircle, faShopppingBasket, faTimes, faSpinner, faTruck, faTasks,)


class App extends Component () {
  render(){
    return (
      <Provider store={store}>
        <div>
          <MyRoutes />
        </div>
      </Provider>
    );
  }

  }
export default App;
