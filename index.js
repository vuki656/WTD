import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'
import { Home } from './src/modules/Home'

AppRegistry.registerComponent(appName, () => Home)
