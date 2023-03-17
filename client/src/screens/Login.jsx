import { React, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import colors from '../constrants/colors'

function Login(props) {
  //navigation
  // const { navigation, route } = props;
  //  //function of navigate 
  // const { navigate, goback } = navigation;

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginwGoogle, setLoginwGoogle] = useState(false)
  const [loginwFb, setLoginwFb] = useState(false)

  return (
    <SafeAreaView style={styles.login}>

      <View style={styles.loginHeader}>
        <Icon style={styles.back}
          name={'chevron-left'}
          size={26}
          // color={colors.primary}
          onPress={() => { navigate('UIScreen') }}
        />
        <Text style={styles.loginTextHeader}>Đăng nhập</Text>
        <Text> </Text>
      </View>

      <View style={styles.LoginContainer}>
        <View style={styles.LoginInputEmail}>
          <TextInput style={styles.LoginTextInputEmail}
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
          ></TextInput>
        </View>

        <View style={styles.LoginInputPassword}>
          <TextInput style={styles.LoginTextInputPassword}
            value={password}
            onChangeText={setPassword}
            placeholder='Mật khẩu'
            secureTextEntry={true}
          ></TextInput>

          <Text
            style={styles.LoginTextForgot}
          >Quên mật khẩu?</Text>
        </View>

        <TouchableOpacity
          style={styles.LoginButtonViewLogin}
          onPress={() => {
            variable.isLogin = 1;
          }} >
          <Icon name="login" size={25} color="#fff" />
          <Text style={styles.LoginButtonLogin}>  Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LoginButtonViewGoogle} >
          <Icon name="google--with-circle" size={35} color="#ED5A4F" />
          <Text style={styles.LoginButtonGoogle}>  Đăng nhập với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.LoginButtonViewFb}>
          <Icon name="facebook" size={33} color="#0571E6" />
          <Text style={styles.LoginButtonFb} >  Đăng nhập với Facebook</Text>
        </TouchableOpacity>

        <View style={styles.LoginViewNoEmail}>
          <Text style={styles.LoginTextNoEmail}>Chưa có tài khoản? </Text>
          <Text
            style={styles.LoginButtonNoEmail}
            onPress={() => {
              navigate('Register');
            }}>Đăng kí
          </Text>
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#fff"
  },

  loginHeader: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  loginTextHeader: {
    fontWeight: "bold",
    fontSize: 21
  },

  LoginContainer: {
    flex: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },

  LoginInputEmail: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    width: '90%',
  },

  LoginTextInputEmail: {
    fontSize: 15
  },

  LoginInputPassword: {
    flexDirection: "row",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    width: '90%',
    marginTop: 46,
    justifyContent: "space-between"
  },

  LoginTextForgot: {
    color: "#FF6363",
    fontSize: 15
  },

  LoginViewNoEmail: {
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63,

  },
  LoginTextInputPassword: {
    flex: 1,
    fontSize: 15

  },
  LoginTextNoEmail: {
    color: '#B0ADAD',
    fontSize: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FF6363'
  },

  LoginButtonNoEmail: {
    fontSize: 15,
    color: "#FF6363",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FF6363",
  },

  LoginButtonViewLogin: {
    width: '90%',
    height: 55,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    marginTop: 63,
    flexDirection: 'row'
  },
  LoginButtonLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center'
  },


  LoginButtonViewGoogle: {
    width: '90%',
    height: 55,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    marginTop: 30,
    flexDirection: 'row'
  },
  LoginButtonGoogle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17
  },

  LoginButtonViewFb: {
    width: '90%',
    height: 55,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderColor: colors.primary,
    flexDirection: 'row'
  },
  LoginButtonFb: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 17
  },


})

export default Login