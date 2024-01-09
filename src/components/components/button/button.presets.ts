import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../../theme"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const SHADOW: ViewStyle = {
  shadowColor: color.shadow,
  shadowOpacity: 9.8,
  shadowRadius: 15,
  shadowOffset: { width: 1, height: 13 },
  elevation: 6,
}

const BASE_TEXT: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  paddingHorizontal: spacing[3],
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.primary,

  } as ViewStyle,

  primaryLarge: {
    ...BASE_VIEW,
    ...SHADOW,
    backgroundColor: color.primary,
    height: hp(8),
    width: wp('80%'),
    marginVertical: 10,
  } as ViewStyle,

  outlineLarge: {
    ...BASE_VIEW,
    ...SHADOW,
    backgroundColor: color.palette.white,
    borderWidth: 2,
    borderColor: color.primary,
    height: hp(8),
    width: wp('80%'),
    marginVertical: 10,
  } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,

  linkDestructive: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: { ...BASE_TEXT, color: color.palette.white } as TextStyle,
  outlineLarge: { ...BASE_TEXT, color: color.primary } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
  linkDestructive: {
    ...BASE_TEXT,
    color: color.destructive,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
