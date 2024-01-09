import { StyledBox } from '../components/styledComponents/index';
import { Header } from "../components/header/Header";
import ButtonGroup from '../components/buttons/ButtonGroup';
import { menuButtons } from '../utilities/menuButtons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VStack, Icon } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { Menu, RefreshCcw, CalendarMinus, Share2  } from 'lucide-react-native';
import { getFromSecureStore } from '../services/helper';
import BolService from "../services/axiosapi/BolService";
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Dimensions, View, TextStyle, ViewStyle, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';


const initialState = {
  blobSource: "",
  errors: {},
  loaded: false,
  showInfo: false
};

const BUTTON_STYLE: ViewStyle = {
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  width: 70,
  position: 'absolute',
  bottom: 30,
  right: Dimensions.get('window').width / 2.5,
  height: 70,
  backgroundColor: "#1f4f7b",
  borderRadius: 100,
}


export default function BolViewerScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { getBOLS, getBOL } = BolService();

  const [state, setState] = React.useState(initialState);
  const [modalVisible, setModalVisible] = React.useState(false);


  const routeparams = {};
  const { TransDate, Terminal, TransRefNo, TransTime, doc_no, unformattedDate } = route.params

  useEffect(() => {
    console.log('navigation', navigation);
    console.log('route.route<>>>>>>>>>>>>>>>>>>>>', route.params)
    //console.log('fuckinruta', fuckinruta.params)
    // const routeparams = route as BLOBROOT;

    getBOLData()
  }, []);

  function getFileUri(name) {
    return FileSystem.documentDirectory + `${encodeURI(name)}.pdf`;
  }

  const shareAndroid = async (fileURI, pdf) => {
    console.log('SHAREANDROID', fileURI, pdf)
    await FileSystem.writeAsStringAsync(fileURI, pdf, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(fileURI);
  }


  const sharePDF = async (fileURI, pdf) => {
    console.log('BOLS TO SHARE', fileURI, pdf);
    await FileSystem.writeAsStringAsync(fileURI, pdf, { encoding: FileSystem.EncodingType.Base64 });

    const shareOptions = {
      title: '',
      url: fileURI,
    };
    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  const shareiOS = (fileURI, pdf) => {
    FileSystem.writeAsStringAsync(
      fileURI,
      pdf, { encoding: FileSystem.EncodingType.Base64 })
      .then(() => {
        console.log("URIII")
        Share.share({
          url: fileURI,
          title: 'title share',
        });
      })
      .catch(error => {
        console.error('ERRRORE', error);
      });
  }


  const generatePDFandShare = async (data) => {
    console.log("generatePDFandShare pdf")
    console.log('data', data)
    const filename = `BOL ${TransRefNo} ${unformattedDate}`

    console.log('filename', filename)
    const pdf = data
    const fileURI = getFileUri(filename);
    if (Platform.OS === 'ios') {
      shareiOS(fileURI, pdf)
    } else {
      sharePDF(fileURI, pdf)
    }
  };

  const getBOLData = async () => {
    console.log('trying to get bols')
    const license = await getFromSecureStore("license");
    console.log("license", license)
    let body = {
      license: license,
      trans_ref_no: "6690059442"
    };
    await getBOL(body).then((bolData) => {
      console.log('BOL DATA', bolData)
      if (bolData !== null) {
        // Handle the successful response data
        console.warn('si hay blob')
        if (bolData.data.result[0].BLOB != null) {
          console.warn('YEP')
          const pdfBlob = bolData.data.result[0].BLOB;
          console.log('PDFBLOB', pdfBlob)
          setState({ ...state, blobSource: bolData.data.result[0].BLOB, loaded: true })

        } else if (bolData.data.result[0].Status === "FILE_NOT_FOUND") {
          console.log("no hay bols")
          setState({ ...state, blobSource: bolData.data.result[0].BLOB, loaded: false })
        } else {
          setState({ ...state, blobSource: bolData.data.result[0].BLOB, loaded: false })
          handleAlertAppErrorEncounterOpen();
        }
      } else {
        console.error('Failed to get BOL data');
        // Handle the case where the HTTP request was not successful
      }
    })
      .catch((error) => {
        console.error('An error occurred:', error);
        // Handle other errors that might occur during the execution
      });
  }


  const showInfo = () => {
    setState({ ...state, showInfo: true });
  }


  const handleAlertAppErrorEncounterOpen = () => {
    console.log('handleAlertAppErrorEncounterOpen')
    setState({ ...state, visibleError: true });
  };
  const handleAlertAppErrorEncounterClose = () => {
    setState({ ...state, visibleError: false });
  };
  const handleAlertAppErrorEncounterCloseGoBack = () => {
    props.navigation.goBack();
  };

  const source = { uri: `data:application/pdf;base64,${state.blobSource}` };

  return (
    <StyledBox flex={1} paddingTop={insets.top} bg='#1F4F7B' >
      <Header headerTx='boList.headerTitle' rightButtons={true} withSettings={false} ons={generatePDFandShare(state.blobSource)} withBack={true} onLeftPress={() => navigation.goBack()} onSharePress={() => console.log()} />
      <VStack flex={1} $light-bg='$light200'>

      </VStack>
      <TouchableOpacity style={BUTTON_STYLE} onPress={() => generatePDFandShare(state.blobSource)} >
        <Icon as={Share2 } size={2} />
      </TouchableOpacity>
    </StyledBox>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.3)'
  }, // Adjust the opacity as desired , // Adjust the opacity as desired },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});
