import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import CommonStyles from '../themes/styles';
const LandingScreen = ({...props}) => {
  return (
    <SafeAreaView style={CommonStyles.safeAreaView}>
      <View style={CommonStyles.pageContainer}>
        <View style={styles.logoCont}>
          <Image
            source={{uri: 'https://picsum.photos/300'}}
            style={styles.logo}
            resizeMode="center"
            resizeMethode="scale"
          />
        </View>
        <View style={styles.buttonCont}>
          <Pressable
            style={CommonStyles.btnLG}
            onPress={() => props.navigation.push('register')}>
            <Text style={CommonStyles.btnTxt}>Register</Text>
          </Pressable>
          <View style={styles.margin} />
          <Pressable
            style={CommonStyles.btnLGOL}
            onPress={() => props.navigation.push('login')}>
            <Text style={CommonStyles.btnTxtOl}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  logoCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    height: 30,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  buttonCont: {
    paddingVertical: 60,
    flexDirection: 'column',
  },
});
export default LandingScreen;
