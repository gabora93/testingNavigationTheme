import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { profileButtons } from '../utilities/menuButtons';
import { ScrollView, View } from '@gluestack-ui/themed';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen({ route, navigation }) {
    
  const insets = useSafeAreaInsets();
  console.log('inset',insets)
    return (
        <StyledBox flex={1}>
            <Header headerTx='profile.headerTitle' withBack={true} onLeftPress={() => navigation.goBack()} />
       
          <ButtonGroup buttons={profileButtons} navigation={navigation} space={'xl'} buttonHeight={'$16'} />
  
        </StyledBox>
    )
};