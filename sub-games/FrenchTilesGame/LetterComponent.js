import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  document,
  UIManager,
  findNodeHandle,
} from "react-native";

const position = new Animated.ValueXY();



export default class LetterComponent extends Component {
    
    constructor(props) {
      super(props);
        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            measurements: {},
            inDropArea: false,
        };
    };
    componentWillMount() {
        console.log("insiide the letter comp", this.props.measurements)
      // Add a listener for the delta value change
      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => this._val = value);
      const handleInDropArea = ()=>{
            console.log("DropZone: Yes");
            Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
        }).start(() =>
            this.setState({
            showDraggable: false
            })
        );
        this.setState({
            ...this.state,
            isDropArea: true
        });
      };

      const handleNotInDropArea = () => {
        console.log("Inside handleNotInDropArea" );
        console.log("DropZone: No");  
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5
        }).start();
        this.setState({
            ...this.state,
            isDropArea: false
        });
      };
      // Initialize PanResponder with move handling
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
            // const pos = this.measure();
            // console.log("Pos: ", pos);
            this.checkInsideDropArea(handleInDropArea, handleNotInDropArea);
            console.log("Release: ", gesture);
            position.setValue({x: gesture.moveX, y: gesture.moveY});
        
        }
      });
      // adjusting delta value
      this.state.pan.setValue({ x:0, y:0});
    }

    componentDidUpdate(){
        console.log("Measurements: ", this.state.measurements);
    }
    componentDidMount(){
        console.log("On First Mount: ", this.state.measurements);
    }
  
    render() {
      const panStyle = {
        transform: this.state.pan.getTranslateTransform()
      }
      return (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.square]}
            ref={ref => this.view = ref}
          >
            <Text style = {styles.letterFormat}>{this.props.letter}</Text>
        </Animated.View>
      );
    }

     measure = () => {
        const coord = this.view.measure((fx, fy, width, height, px, py) => {
            console.log('Component width is: ' + width)
            console.log('Component height is: ' + height)
            console.log('X offset to frame: ' + fx)
            console.log('Y offset to frame: ' + fy)
            console.log('X offset to page: ' + px)
            console.log('Y offset to page: ' + py)
            return {px, py};
        })
        return coord;
    }

    checkInsideDropArea(resolve, reject){
        console.log("Inside isDropArea");
        this.view.measure(
            (fx, fy, width, height, px, py) => {
                const found = this.props.dropZoneMeasurements.get(this.props.letter).findIndex(measurement => {
                    console.log("Inside find: ", measurement, measurement.px+10, measurement.px-10, measurement.py+10, measurement.py-10);
                    console.log("Inside find px, py: ", px, py);
                    console.log("Condition result: ",((py <= measurement.py+10 && py >= measurement.py -10)));
                    if((px <= measurement.px+10 && px >= measurement.px -10) && (py <= measurement.py+10 && py >= measurement.py -10)){
                        console.log("Condition")
                        return true;
                    }else{
                        return false;
                    }
                });
                console.log("Found: ", found);
                if(found !=-1){
                    resolve();
                }else{
                    reject();
                }
            }
        );
    }
  };
  
  let SQUARE_RADIUS = 45;
  let styles = StyleSheet.create({
    square: {
      backgroundColor: "#e6d9cd",
      borderWidth: 2,
      borderColor: '#555555',
      width: SQUARE_RADIUS,
      height: SQUARE_RADIUS,
      borderRadius: 7,
      justifyContent: 'center',
      alignContent: 'center',
      marginHorizontal: 10,
      marginBottom: 20,
    },

    letterFormat: {
        fontSize: 21,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    }
  });