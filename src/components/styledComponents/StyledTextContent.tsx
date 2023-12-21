import {Text, styled} from '@gluestack-ui/themed';

const StyledTextContent = styled(Text, {
    fontWeight: "$extrabold",
    fontStyle: "normal",
    fontSize: "$lg",
    color: "black",
    _dark: {
      color: "white",
    },
  })

  export default StyledTextContent;