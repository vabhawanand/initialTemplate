/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import KeyboardAwareView from '../components/keyboard_aware_scroll_view';
import {authAction} from '../store/actions/authActions';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import {
  isPasswordLen,
  isValidEmail,
  isValidMobile,
  isValidName,
} from '../utils';
const RegisterScreen = ({...props}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  const passRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const doRegister = () => {
    if (!isValidName(name)) {
      toastRef.current?.show('Invalid name input', 1000);
    } else if (!isValidEmail(email)) {
      toastRef.current?.show('Invalid email input', 1000);
    } else if (!isPasswordLen(password)) {
      toastRef.current?.show('Invalid password input', 1000);
    } else if (!isValidMobile(phone)) {
      toastRef.current?.show('Invalid mobile number', 1000);
    } else {
      setIsLoading(true);
      let data = {
        name,
        email,
        phone,
        password,
      };
      props
        .doRegister(data)
        .then(res => toastRef.current?.show(res, 1000))
        .catch(e => toastErrorRef.current?.show(e, 1000))
        .finally(() => setIsLoading(false));
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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{}}>
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
              <Text style={CommonStyles.heading}>Hello!</Text>
              <View style={{height: 12}} />
              <Text style={CommonStyles.subHeading}>
                Please create an account to continue.
              </Text>

              <View style={styles.inputCont}>
                <Text style={CommonStyles.inputLabel}>Name</Text>
                <TextInput
                  value={name}
                  textContentType="name"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  keyboardType="default"
                  onChangeText={text => setName(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <Text style={CommonStyles.inputLabel}>Email</Text>
                <TextInput
                  ref={emailRef}
                  value={email}
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  keyboardType="email-address"
                  onChangeText={text => setEmail(text)}
                  placeholderTextColor={colors.color000}
                  style={[CommonStyles.inputContainer]}
                />
              </View>
              <View style={styles.inputCont}>
                <Text style={CommonStyles.inputLabel}>Phone</Text>
                <TextInput
                  ref={phoneRef}
                  value={phone}
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passRef.current?.focus()}
                  keyboardType="default"
                  onChangeText={text => setPhone(text)}
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
                    onSubmitEditing={() => doRegister()}
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
          </ScrollView>
        </View>
        <View style={styles.buttonCont}>
          <Pressable
            onPress={() => doRegister()}
            disabled={isLoading}
            style={[CommonStyles.btnLG, {backgroundColor: colors.color23}]}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.colorF72} />
            ) : (
              <Text style={CommonStyles.btnTxt}>Register</Text>
            )}
          </Pressable>
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
    // height: 250,
    marginBottom: 25,
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
    paddingTop: 25,
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
    doRegister: data => dispatch(authAction.doRegister(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
