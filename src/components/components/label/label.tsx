import React from "react";
import { Text } from "../text/text";
import { TextStyle } from "react-native";
import { color } from "../../../theme";
import { translate, TxKeyPath } from "../../../i18n/i18n"




export function Label({ title, required = false }) {

  return (
    <Text style={TITLE_STYLE}>
      {translate(title,null)} {required ? <Text style={REQUIRED}>*</Text> : ''}
    </Text>
  );
}

const TITLE_STYLE: TextStyle = {
	color: color.palette.black,
	lineHeight: 23,
}

const REQUIRED: TextStyle = {
	color: 'red'
}
