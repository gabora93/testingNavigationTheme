import {Pressable, styled} from '@gluestack-ui/themed';


export const StyledButton = styled(
  Pressable,
  {
    rounded: "$2xl",
    shadowColor: 'blue',
    shadowOpacity:1,
    shadowRadius:50,
    variants: {
      variant: {
        solid: {  bg: "$light200",
        borderWidth: "$4",
        borderColor: "#1F4F7B", _dark:{bg:"$light100" }
         },
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