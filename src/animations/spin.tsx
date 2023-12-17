import { Animated, Easing} from "react-native"
import { rotation } from "./animatedValues";

const spin = () => {
    rotation.setValue(0);
    Animated.timing(
      rotation,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => spin());
  };

  export { spin}