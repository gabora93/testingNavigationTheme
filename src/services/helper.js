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
        console.log('keyyyyyo    ', key);

        const value = await SecureStore.getItemAsync(key);

        if (value !== null) {
            console.log('VALUE:::', value);
            return value;
        } else {
            console.log('VALUE IS NULLLLLLLLLLLLLLLLL');
            return null;
        }
    } catch (error) {
        console.error('Error while getting value from SecureStore:', error, key);
        return null;
    }
};

export const saveOnSecureStore = async (key, value) => {
    try {
    console.log('keyyyyy  to saveeeee  ', key, value)
    await SecureStore.setItemAsync(key, value);
} catch (error) {
    console.error('Error while saving value from SecureStore:', error, key, value);
    return null;
}
};

export const deleteKeySecureStore = async (key) => {
    await SecureStore.deleteItemAsync(key);
};

