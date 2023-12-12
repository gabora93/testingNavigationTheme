import React, { useContext } from "react";
import { Icon, MoonIcon, SunIcon, Pressable } from "@gluestack-ui/themed";
import { ThemeContext } from "../../../App";

function toggleIcon(colorMode: string){
  return colorMode === "dark" ? SunIcon : MoonIcon;
}

const ToggleMode = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);
  return (
    <Pressable onPress={toggleColorMode}>
      <Icon
        as={toggleIcon(colorMode)}
        size="xl"
        color="$backgroundLight700"
        sx={{
          _dark: {
            color: "$backgroundDark300",
          },
        }}
        fill="currentColor"
      />
    </Pressable>
  );
};
export default ToggleMode;