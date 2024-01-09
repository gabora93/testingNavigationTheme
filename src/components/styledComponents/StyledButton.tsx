import {Pressable, styled} from '@gluestack-ui/themed';


export const StyledButton = styled(
  Pressable,
  {
    rounded: "$lg",
    variants: {
      variant: {
        solid: { bg: "#1F4F7B", _dark:{bg:"#1F4F7B" } },
        outline: {
          bg: "$light100",
          borderWidth: "$2",
          borderColor: "#1F4F7B", _dark:{bg:"#1F4F7B" }
          
        },
      },
    },
  },
  {}
);