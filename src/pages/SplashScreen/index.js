import React, {Component} from 'react';
import{View, ImageStore} from 'react-native'
import LoginScreen from '../LoginScreen'
import {Images} from '../../themes/Images'

class SplashScreen extends Component{
    constructor(props){
        super(props)
        this.setState={
            isLoaded : false,
        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <View>
                
            </View>
        );
    }
}

export default SplashScreen;