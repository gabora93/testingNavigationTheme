import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { IconTypes } from "../icon/icons"
import { TxKeyPath } from "../../../i18n/i18n"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath

  /**
   * header non-i18n
   */
  headerText?: string
  subtitle?: string

  bolViewer?: Boolean

  shareIcon?: Boolean
  
  withBack?: Boolean
  
  withSettings?: Boolean
  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightButtons?: boolean

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void


  onSettingsPress?(): void

 /**
   * What happens when you press the share icon
   */
  onSharePress?(): void
  

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>
}
