import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { IconTypes } from "../icon/icons"
import { TxKeyPath } from "../../i18n"
import { DATAA } from "../../types/types"

export interface DocumentListProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath

  data: DATAA[];

 selectedItems: DATAA[];
 
 onItemSelect?(): void;

 

  /**
   * header non-i18n
   */
  headerText?: string
  subtitle?: string

  bolViewer?: Boolean

  shareIcon?: Boolean
  
  withBack?: Boolean
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
  rightIcon?: IconTypes

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

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
