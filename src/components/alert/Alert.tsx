

import { Center, Button, ButtonText, AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogCloseButton, AlertDialogHeader,AlertDialogFooter, Heading, Icon, CloseIcon,Text,ButtonGroup, AlertText,CheckCircleIcon, VStack, View} from '@gluestack-ui/themed';
import { StyledButton, StyledButtonText, StyledText } from '../../components/styledComponents/index';
import React, { useState} from 'react';
import { i18n } from '../../i18n/i18n';

const AlertComponent = (props) => {
    const {showAlertDialog,setShowAlertDialog, text, onClose, username, usernamerecovered, password, passwordText,passwordText2 } = props;
    return (
      <Center>
        <AlertDialog
          isOpen={showAlertDialog}
          onClose={() => {
          setShowAlertDialog(false);
          }}
        >
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading size='lg'>{i18n.t(text)}</Heading>
            </AlertDialogHeader>
            <AlertDialogBody>
            { username ? <StyledText color='black'>{usernamerecovered}</StyledText> : <></>}
            { password ? <StyledText color='black'>{i18n.t(passwordText)}</StyledText> : <></>}
            { password ? <StyledText color='black'>{i18n.t(passwordText2)}</StyledText> : <></>}
            </AlertDialogBody>
            <AlertDialogFooter>
             <ButtonGroup space="lg" justifyContent='center' alignContent='center'>
              <Button justifyContent='center' alignContent='center'
                variant="outline"
                action="secondary"
                onPress={() => {
                  onClose()
                  setShowAlertDialog(false);
                }}
              >
                <ButtonText>{i18n.t('termsScreen.accept')}</ButtonText>
              </Button>
               </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Center>
    );
  }

  export default AlertComponent;