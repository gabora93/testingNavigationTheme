import MaskedView from '@react-native-masked-view/masked-view';
import { Icon, Home, SettingsIcon, View, Text} from "@gluestack-ui/themed"
import { StyledLinearGradient } from './StyledLinearGradient';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const size = 40

const GradientText = (props) => {
    const { colors, size, as, text } = props;
  return (
<MaskedView
      style={{ flex: 1, flexDirection: 'row', height: '100%' }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        <Text style={styles.shadow} >{text}</Text>
        </View>
      }
    >
      {/* Shows behind the mask, you can put anything here, such as an image */}
      <LinearGradient 
          colors={colors}
          style={{ flex: 1 }}
        />
    </MaskedView>
  )
}

const styles = StyleSheet.create({
    shadow: {
      shadowOpacity: 0.7,
      shadowRadius: 5,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
  })
export default GradientText;