import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, PanResponder } from 'react-native';
import style from '../../style/styles';
import { Images } from '../../themes/Images';

const Dogs = [
    { id: "1", uri: Images.appImages.image1 },
    { id: "2", uri: Images.appImages.image2 },
    { id: "3", uri: Images.appImages.image3 },
    { id: "4", uri: Images.appImages.image4 },
    { id: "5", uri: Images.appImages.image5 },
    { id: "6", uri: Images.appImages.image6 },
    { id: "7", uri: Images.appImages.image7 },
    { id: "8", uri: Images.appImages.image8 },
    { id: "9", uri: Images.appImages.image9 },
];

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class SwippingPage extends Component {
    constructor(props) {
        super(props)
        this.position = new Animated.ValueXY();

        this.state = {
            currentIndex: 0
        };

        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ['-10deg', '0deg', '10deg'],
            extrapolate: 'clamp'
        });

        this.rotateAndTranslate = {
            transform: [{
                rotate: this.rotate
            },
            ...this.position.getTranslateTransform()]
        };

        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        this.nopeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp'
        });

        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp'
        });

    }

    componentDidMount() {
    }

    componentWillMount() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    })
                } else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        friction: 4
                    }).start()
                }
            }
        })
    }


    renderDogs() {
        return Dogs.map((item, i) => {

            if (i < this.state.currentIndex) {
                return null;
            } else if (i == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={item.id}
                        style={[this.rotateAndTranslate, {
                            height: SCREEN_HEIGHT - 120,
                            width: SCREEN_WIDTH,
                            padding: 10,
                            position: 'absolute'
                        }]}>

                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={style.likeTextStyle}>LIKE</Text>
                        </Animated.View>

                        <Animated.View style={{ opacity: this.nopeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={style.nopeTextStyle}>NOPE</Text>
                        </Animated.View>

                        <Image
                            style={style.swipingImageStyle}
                            source={item.uri} />
                    </Animated.View>
                )
            } else {
                return (
                    <Animated.View
                        key={item.id}
                        style={[{
                            opacity: this.nextCardOpacity,
                            transform: [{ scale: this.nextCardScale }],
                            height: SCREEN_HEIGHT - 120,
                            width: SCREEN_WIDTH,
                            padding: 10,
                            position: 'absolute'
                        }]}
                    >
                        <Image
                            style={style.swipingImageStyle}
                            source={item.uri} />
                    </Animated.View>
                )
            }


        }).reverse()
    }

    render() {
        return (
            <View style={style.swippingContainer}>

                <View style={style.swippingHeaderContainer}>
                </View>

                <View style={style.swippingMiddleContainer}>
                    {this.renderDogs()}
                </View>

                <View style={style.swippingLowerContainer}>
                </View>
            </View>
        );
    }
}

export default SwippingPage;