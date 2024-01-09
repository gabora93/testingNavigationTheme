import { Popover, View, VStack, Pressable, Text, CloseIcon, Modal, PopoverHeader, Heading, Icon, Button, ButtonText, Center, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@gluestack-ui/themed';
import { BlurView } from 'expo-blur';
import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { i18n } from '../../i18n/i18n';
import { StyledHS, StyledText, StyledBox } from '../styledComponents/index';


export function ModalComponent({ isOpened, state, setRefresh, setIsOpen, handleOpen, handleClose, setLocale, locale }) {
  const ref = React.useRef(null)

  const languages = [{'language':'english','locale':'en-US'},
  {'language':'nederlands','locale':'nl-NL'},
  {'language':'french','locale':'fr-FR'},
  {'language':'german','locale':'de-DE'},
  {'language':'italian','locale':'it-IT'},
  {'language':'spanish','locale':'es-MX'},
  {'language':'Polish','locale':'pl-PL'},
];
  return (
    <SafeAreaView>

    
        <Modal
          isOpen={isOpened}
          onClose={() => {
            setIsOpen(false)
          }}
          finalFocusRef={ref}
        >
          <ModalBackdrop />


          <View h="70%" w="$full" justifyContent='center' alignItems='center'  borderTopRightRadius={5}>
            <BlurView intensity={50}  style={{ height: "70%", width: "90%" }}>
              <ModalHeader borderTopRightRadius={5}>
                <Heading size="lg">{i18n.t('changelanguage.btnChangeLanguageSelection')}</Heading>
                <ModalCloseButton>
                  <Icon as={CloseIcon} />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody   borderTopRightRadius={5}>
         <VStack space='xl' >
         {languages.map((item, index) => {
          console.log('locale in modalComponent', locale)
          console.log(item)
                  return(
                    <Pressable key={index} justifyContent='center' alignItems='center' onPress={() => {
                      i18n.locale = item.locale;
                      setLocale(item.locale)
                     setRefresh({...state, refresh: true})
                    }}>
                      <StyledText color={locale === item.locale ? 'blue' : 'black'}>{i18n.t(`changelanguage.${item.language}`)}</StyledText>
                    </Pressable>
                  )
                })}
         </VStack >
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="outline"
                  size="sm"
                  action="secondary"
                  mr="$3"
                  onPress={() => {
                    setIsOpen(false)
                  }}
                >
                  <ButtonText>{i18n.translate('common.cancel')}</ButtonText>
                </Button>
                <Button
                  size="sm"
                  action="positive"
                  borderWidth="$0"
                  onPress={() => {
                    setIsOpen(false)
                  }}
                >
                  <ButtonText>{i18n.translate('common.ok')}</ButtonText>
                </Button>
              </ModalFooter>
            </BlurView>
          </View>
        </Modal>

    </SafeAreaView>

  )
};