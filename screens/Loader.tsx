import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useStore} from '../store/userStore';
import {useMagicSigner} from '../hooks/useMagicSigner';
import {RootStackScreenProps} from '../types/navigation';
import {useAlchemyProvider} from '../hooks/useAlchemyProvider';

const Loader = ({navigation}: RootStackScreenProps<'Loader'>) => {
  const {setIsLoggedIn, setOwnerAddress, setScaAddress, setUserName} =
    useStore();
  const {connectProviderToAccount} = useAlchemyProvider();
  const {magic, signer} = useMagicSigner();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        if (!magic || !signer) {
          console.log('no magic or signer object');
          return;
        }
        const isLoggedIn = await magic.user.isLoggedIn();

        setIsLoggedIn(isLoggedIn);
        if (!isLoggedIn) {
          navigation.navigate('Login');
        }
        if (isLoggedIn) {
          const provider = connectProviderToAccount(signer);
          const metadata = await magic.user.getInfo();
          console.log(
            'connected provider with the signer and created smaart account',
            await provider.getAddress(),
          );
          setUserName(metadata.email!);
          setOwnerAddress(metadata.publicAddress!);
          setScaAddress(await provider.getAddress());
          navigation.navigate('Root');
        }
      } catch (error) {
        console.log('eror in login:', error);
      }
    };
    checkLogin();
  }, [
    connectProviderToAccount,
    magic,
    signer,
    setIsLoggedIn,
    setOwnerAddress,
    setScaAddress,
    setUserName,
    navigation,
  ]);
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'#FFFFFF'} />
      <Text style={styles.text}>Loader</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
});
