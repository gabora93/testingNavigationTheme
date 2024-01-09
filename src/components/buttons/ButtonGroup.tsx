import { VStack, HStack, } from '@gluestack-ui/themed';
import { StyledButton, StyledButtonText, StyledText } from '../../components/styledComponents/index';
import { i18n } from '../../i18n';


const ButtonGroup = (props) => {
    const { buttons, navigation, space, buttonHeight, showDescription, openModal } = props;
    console.log(buttons)
    return (
        <HStack justifyContent='center' alignItems="center" flex={1}>
            <VStack space={space} alignItems="center" justifyContent='center' h={'$5/6'} flex={1}>
                {props.buttons.map((button, index) => (showDescription ?
                    <>
                        <StyledButton sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4" 
                        onPress={() => navigation.navigate(button.route)} key={index} alignItems="center" justifyContent='center' h={buttonHeight} w="$5/6" >
                            <StyledButtonText sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t(button.label)}</StyledButtonText>
                        </StyledButton>
                        <VStack justifyContent="center" alignItems="center" >
                            <StyledText color="black">{i18n.t(button.description)}</StyledText>
                        </VStack>
                    </>
                    :
                    <StyledButton sx={{ _dark: { borderColor: 'cyan', borderBottomColor: '$red900', borderBottomWidth: 5 }, _light: { variant: 'solid' } }} variant='outline' hardShadow="4"
                     onPress={() => button.route === "modal" ? openModal() : navigation.navigate(button.route) } key={index} alignItems="center" justifyContent='center' h={buttonHeight} w="$5/6" >
                        <StyledButtonText sx={{ _dark: { color: 'white' }, _light: { color: '#1F4F7B' } }}>{i18n.t(button.label)}</StyledButtonText>
                    </StyledButton>
                ))}
            </VStack>
        </HStack>
    )
};
export default ButtonGroup;