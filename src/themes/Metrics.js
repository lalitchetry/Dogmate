import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

// Used via Metrics.baseSpace

let Metrics = {};
Metrics.sHeight = Math.round(Dimensions.get('window').height);
Metrics.sWidth = Math.round(Dimensions.get('window').width);

export default Metrics;
