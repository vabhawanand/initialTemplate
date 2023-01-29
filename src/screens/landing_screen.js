import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  useColorScheme,
} from 'react-native';
import {useDarkModeContext, useDynamicStyleSheet} from 'react-native-dark-mode';
import CommonStyles from '../themes/styles';
const LandingScreen = ({...props}) => {
  const CStyles = useDynamicStyleSheet(CommonStyles);
  console.log({isDark: useDarkModeContext()});
  // console.log({CommonStyles});
  return (
    <SafeAreaView style={CStyles.safeAreaView}>
      <View style={CStyles.pageContainer}>
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
            style={CStyles.btnLG}
            onPress={() => props.navigation.push('register')}>
            <Text style={CStyles.btnTxt}>Register</Text>
          </Pressable>
          <View style={styles.margin} />
          <Pressable
            style={CStyles.btnLGOL}
            onPress={() => props.navigation.push('login')}>
            <Text style={CStyles.btnTxtOl}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};;;;;
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
