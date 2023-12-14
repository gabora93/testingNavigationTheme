import {Pressable, styled} from '@gluestack-ui/themed';


export const StyledButton = styled(
  Pressable,
  {
    rounded: "$lg",
    variants: {
      variant: {
        solid: { bg: "#1F4F7B", _dark:{bg:"#1F4F7B" } },
        outline: {
          bg: "#1F4F7B",
          borderWidth: "$2",
          borderColor: "$borderLight100", _dark:{bg:"#1F4F7B" }
          
        },
      },
    },
  },
  {}
);