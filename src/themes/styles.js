import {StyleSheet, Dimensions} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import colors from './colors';
const initialLayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').width,
};

const CommonStyles = new DynamicStyleSheet({
  keyboardAwareScroll: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    height: initialLayout.height,
    width: initialLayout.width,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.pBgDark, colors.pBgLight),
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: new DynamicValue('#000', '#fff'),
  },
  btnLG: {
    width: 350,
    height: 44,
    borderRadius: 27,
    alignSelf: 'center',
    backgroundColor: colors.colorF72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLGOL: {
    width: 350,
    height: 44,
    borderRadius: 27,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: new DynamicValue('#fff', colors.color23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  btnTxtOl: {
    color: new DynamicValue('#fff', colors.color23),
    fontWeight: '600',
    fontSize: 16,
  },
  inputCont: {
    width: 350,
    height: 44,
    borderRadius: 6,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    color: colors.color000,
    // lineHeight: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.color23,
  },
  detailsTitle: {
    fontSize: 23,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.color23,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: colors.color23,
    paddingVertical: 8,
  },
  detailsPara: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.color000,
    paddingVertical: 8,
  },
  heading: {
    fontSize: 36,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.color23,
    lineHeight: 40,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    color: colors.color42,
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.color42,
    lineHeight: 16,
  },
  forgotLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: colors.colorF72,
    lineHeight: 16,
  },
  inputContainer: {
    height: 44,
    width: '100%', // 350,
    borderRadius: 6,
    backgroundColor: colors.colorF4F,
    paddingHorizontal: 6,
    fontSize: 18,
    color: colors.color000,
  },
  backBtnCnt: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color23,
    borderRadius: 12,
  },
});
export default CommonStyles;
