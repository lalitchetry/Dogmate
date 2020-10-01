import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Metrics } from '../themes';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  swippingContainer: {
    flex: 1,
  },
  swippingHeaderContainer: {
    height: 60,
  },
  swippingMiddleContainer: {
    flex: 1,
  },
  swippingLowerContainer: {
    height: 60,
  },
  swippingAnimatedView: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position : 'absolute'
  },
  swipingImageStyle: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  likeTextStyle:{
    borderRadius:5,
    borderWidth:2,
    borderColor:'green',
    color :'green',
    fontSize:32,
    fontWeight:'500',
    padding :10,
  },
  nopeTextStyle:{
    borderRadius:5,
    borderWidth:2,
    borderColor:'red',
    color :'red',
    fontSize:32,
    fontWeight:'500',
    padding :10,
  }
});

export default styles;
