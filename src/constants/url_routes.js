import {App_Base_Url} from './index';
export default class Routes {
  static Login_Url = App_Base_Url + 'login';
  static Register_Url = App_Base_Url + 'register';
  static Forgot_Password_Url = App_Base_Url + 'forget-password';
  static Validate_FP_Hash_Url = App_Base_Url + 'validate-fp-hash';
  static Reset_Password_Url = App_Base_Url + 'reset-password';
  static Verify_Email_Url = App_Base_Url + 'verify-email';
}
