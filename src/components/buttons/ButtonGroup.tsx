import { VStack, HStack,} from '@gluestack-ui/themed';
import { StyledButton, StyledButtonText } from '../../components/styledComponents/index';

const ButtonGroup = (props) => {
    const { buttons, navigation, space, buttonHeight } = props;
    return (
            <HStack justifyContent='center' alignItems="center" flex={1}>
                <VStack space={space} alignItems="center" justifyContent='center' h={'$5/6'} flex={1}>
                    {props.buttons.map((button, index) => (
                        <StyledButton hardShadow="4" onPress={() => navigation.navigate(button.route)} key={index} alignItems="center" justifyContent='center' variant="solid" h={buttonHeight} w="$5/6" >
                            <StyledButtonText color='#1F4F7B'>{button.label}</StyledButtonText>
                        </StyledButton>
                    ))}
                </VStack>
            </HStack>
    )
};
export default ButtonGroup;