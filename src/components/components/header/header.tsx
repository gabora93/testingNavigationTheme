import React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity, Platform  } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../../theme"
import { i18n } from "../../../i18n/i18n"
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 2 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    onSharePress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    subtitle,
    bolViewer,
    shareIcon
  } = props
  const header = headerText || (headerTx && i18n.t(headerTx)) || ""

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
         <TouchableOpacity  onPress={onLeftPress} style={{ width:wp(15), height: hp(4)}}>
        <TouchableOpacity onPress={onLeftPress} >
          <FontAwesome style={{marginLeft: spacing[4]}} name="arrow-left" size={20} color="white"  />
        </TouchableOpacity > 
          </TouchableOpacity>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      {subtitle ? (  <Text style={[TITLE, titleStyle]} text={subtitle} />) : ( <View style={LEFT} />)}
      </View>
      {rightIcon ? ( bolViewer ?  <Button preset="link" onPress={onRightPress}>
          <FontAwesome name="info-circle" size={wp(8)} color="white"  style={{marginRight: spacing[2]}}/>
        </Button> :
      <>
      { shareIcon ?  <Button preset="link" onPress={onSharePress}>
         <FontAwesome name="share-alt" size={wp(8)} color="white"  style={{marginRight: spacing[2]}}/>
       </Button> : <></>}

        <Button preset="link" onPress={onRightPress}>
          <FontAwesome name="cog" size={wp(8)} color="white"  style={{marginRight: spacing[2]}}/>
        </Button>
        
       </>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
