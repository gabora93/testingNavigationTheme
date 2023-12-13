import {Pressable, styled} from '@gluestack-ui/themed';


export const StyledButton = styled(
  Pressable,
  {
    rounded: "$lg",
    py: "$3",
    px: "$9",
    variants: {
      variant: {
        solid: { bg: "$darkBlue600", _dark:{bg:"$darkBlue600" } },
        outline: {
          bg: "$darkBlue600",
          borderWidth: "$2",
          borderColor: "$borderLight100", _dark:{bg:"$darkBlue900" }
          
        },
      },
    },
  },
  {}
);