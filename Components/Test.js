// Components/Test.js

import React from 'react'
import { StyleSheet, View, Animated, Easing,PanResponder, Dimensions } from 'react-native'

class Test extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        topPosition: 0,
        leftPosition: 0,
      }
      
      var {height, width} = Dimensions.get('window');
      this.panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderMove: (evt, gestureState) => {
              let touches = evt.nativeEvent.touches;
              if (touches.length == 1) {
                  this.setState({
                    topPosition: touches[0].pageY - height/2,
                    leftPosition: touches[0].pageX - width/2
                  })
              }
          }
      })
    }
  
    render() {
      return (
        <View style={styles.main_container}>
          <View
            {...this.panResponder.panHandlers}
            style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
          </View>
        </View>
      )
    }
  }

  export default Test