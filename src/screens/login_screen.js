/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Keyboard,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {isPasswordLen, isValidEmail} from '../utils/index';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({...props}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const passRef = useRef(null);

  React.useEffect(() => {
    const checkPermission = async () => {
      const authorizationStatus = await messaging().requestPermission();

      if (authorizationStatus) {
        messaging()
          .getToken()
          .then(fbtoken => {
            setToken(fbtoken);
          });
      }
    };
    checkPermission();
  });

  const doLogin = () => {
    if (!isValidEmail(email)) {
      toastRef.current?.show('Invalid email input', 1000);
    } else if (!isPasswordLen(password)) {
      toastRef.current?.show('Invalid password input', 1000);
    } else {
      setIsLoading(true);
      let data = {
        email,
        password,
        token,
      };
      props
        .doLogin(data)
        .then(res => {
          toastRef.current?.show(res, 1000, () => {
            props.navigation.reset({
              index: 0,
              routes: [{name: 'home'}],
            });
          });
        })
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <KeyboardAwareView>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <View style={styles.container}>
          <View style={{marginTop: 16}}>
            <Pressable
              style={CommonStyles.backBtnCnt}
              onPress={() => props.navigation.pop()}>
              <Image
                source={require('../assets/icon/back.png')}
                style={{width: 10, height: 20, tintColor: '#fff'}}
              />
            </Pressable>
          </View>

          <View style={styles.logoCont}>
            <Image
              source={{uri: 'https://picsum.photos/300'}}
              style={styles.logo}
              resizeMode="center"
              resizeMethode="resize"
            />
          </View>
          <Pressable
            onPress={() => Keyboard.dismiss()}
            style={styles.lowerCont}>
            <Text style={CommonStyles.heading}>Welcome Back!</Text>
            <View style={{height: 12}} />
            <Text style={CommonStyles.subHeading}>
              Please sign in to continue.
            </Text>

            <View style={styles.inputCont}>
              <Text style={CommonStyles.inputLabel}>Email</Text>
              <TextInput
                value={email}
                textContentType="emailAddress"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                placeholderTextColor={colors.color000}
                style={[CommonStyles.inputContainer]}
              />
            </View>
            <View style={styles.inputCont}>
              <Text style={CommonStyles.inputLabel}>Password</Text>
              <View
                style={[
                  CommonStyles.inputContainer,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  ref={passRef}
                  placeholder="Minimum 6 character"
                  value={password}
                  secureTextEntry={isSecure}
                  textContentType="password"
                  keyboardType="default"
                  returnKeyType="done"
                  onSubmitEditing={() => doLogin()}
                  onChangeText={text => setPassword(text)}
                  placeholderTextColor={colors.color000}
                  style={{flex: 1, marginEnd: 10}}
                />
                <Pressable
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={{}}
                  onPress={() => setIsSecure(!isSecure)}>
                  {isSecure ? (
                    <Image
                      source={require('../assets/icon/show-pass.png')}
                      style={styles.inputIcon}
                    />
                  ) : (
                    <Image
                      source={require('../assets/icon/hide-pass.png')}
                      style={styles.inputIcon}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </Pressable>
          <TouchableOpacity
            hitSlop={{left: 15, top: 5, bottom: 15, right: 15}}
            onPress={() => props.navigation.navigate('forgot')}
            style={styles.forgotContainer}>
            <Text style={CommonStyles.forgotLabel}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.buttonCont}>
            <Pressable
              onPress={() => doLogin(email, password)}
              disabled={isLoading}
              style={[CommonStyles.btnLG, {backgroundColor: colors.color23}]}>
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.colorF72} />
              ) : (
                <Text style={CommonStyles.btnTxt}>Login</Text>
              )}
            </Pressable>
          </View>
        </View>
        <Toast ref={toastRef} position="bottom" />
        <Toast
          ref={toastErrorRef}
          position="bottom"
          style={{backgroundColor: colors.colorF72}}
        />
      </SafeAreaView>
    </KeyboardAwareView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: initialLayout.height - 300,
  },
  lowerCont: {
    height: 250,
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
    paddingTop: 95,
    paddingBottom: 25,
    flexDirection: 'column',
  },
  inputCont: {
    marginTop: 24,
  },
  forgotContainer: {
    marginTop: 12,
    paddingTop: 12,
    alignSelf: 'flex-end',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doLogin: data => dispatch(authAction.doLogin(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
