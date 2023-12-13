import {Text, styled} from '@gluestack-ui/themed';
export const StyledButtonText = styled(Text,
  {
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$xl",
    color: "$white",
    _dark: {
      color: "$white",
    },
  },
  {}
);