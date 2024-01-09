import * as SecureStore from "expo-secure-store";

export const getFromSecureStore2 = async (key) => {
    console.log('keyyyyya    ', key);
    const value = await SecureStore.getItemAsync(key);
    if(value){
    console.log('VALUE:::', value)
    }else{
        console.log('VALLUE IS NULLLLLLLLLLLLLLLLL')
    }
    return (value != null) ?  value :  null
};


export const getFromSecureStore = async (key) => {
    try {
        console.log('getFromSecureStore key    ', key);

        const value = await SecureStore.getItemAsync(key);

        if (value !== null) {
            console.log('VALUE:::', value);
            return value;
        } else {
            console.log(`VALUE IS NULL FOR key: ${key}`);
            return null;
        }
    } catch (error) {
        console.error('Error while getting value from SecureStore:', error, key);
        return null;
    }
};

export const saveOnSecureStore = async (key, value) => {
    console.log('keyyyyy  to saveeeee  ', key, value)
  

    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.error('Error while saving value from SecureStore:', error, key);
        return null;
    }
};

export const deleteKeySecureStore = async (key) => {
    await SecureStore.deleteItemAsync(key);
};

