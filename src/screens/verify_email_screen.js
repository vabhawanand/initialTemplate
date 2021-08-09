import React, {useRef, useState} from 'react';
import {SafeAreaView, ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {authAction} from '../store/actions/authActions';
const VerifyEmailScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState(props.route.params.hash);
  const toastRef = useRef(null);
  const toastErrorRef = useRef(null);
  React.useEffect(() => {
    setIsLoading(true);
    validateHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);
  const validateHash = () => {
    props
      .doValidateEmailHash({hash})
      .then(res => {
        setIsLoading(false);
        toastErrorRef.current?.show(res, 1000, () => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'landing'}],
          });
          // props.navigation.pop();
        });
      })
      .catch(e => {
        setIsLoading(false);
        toastErrorRef.current?.show(e, 1000, () => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'landing'}],
          });
          // props.navigation.pop();
        });
      });
  };
  return (
    <SafeAreaView style={CommonStyles.safeAreaView}>
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator size="large" color={colors.colorF72} />
        )}
      </View>
      <Toast ref={toastRef} position="bottom" />
      <Toast
        ref={toastErrorRef}
        position="bottom"
        style={{backgroundColor: colors.colorF72}}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    doValidateEmailHash: data => dispatch(authAction.doValidateEmailHash(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailScreen);
