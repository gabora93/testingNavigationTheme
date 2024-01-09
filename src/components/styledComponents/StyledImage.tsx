import Image from 'expo-image';
import { styled, } from "@gluestack-ui/themed"

// Using the Expo Image component
const StyledImage = styled(Image, {},{});

// import the createImage function
import { createImage } from '@gluestack-ui/image';

// Understanding the API
const ImageStyled = createImage({
  Root: StyledImage,
});

export default () => <ImageStyled />;