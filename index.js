/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import store from './app/Redux/store'

const provider = () =>{
    return(
        <Provider store={store} >
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => provider);
