/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
//import { Button } from 'antd-mobile-rn';
import {
  NativeModules,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import HelloWorld from './HellWorld';
import Test from './src/Test';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ScreenReaderStatusExample from './src/ScreenReaderStatusExample';
import { Post, PostMVC } from './api/Base';
import Input from 'antd-mobile-rn/lib/input-item/Input.native';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./ip.png')}
        style={{ width: 30, height: 30, backgroundColor: '#FFFAFA' }}
      />
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="+1"
          color="#000"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    console.warn(this.state.count);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details', { 'param': 'just param' })}
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      // title: params ? params.otherParam : 'A Nested Details Screen',
      //title: 'Details',
      headerTitle: <LogoTitle />,
      /* These values are used instead of the shared configuration! */
      // headerStyle: {
      //   backgroundColor: navigationOptions.headerTintColor,
      // },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#000"
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.props.navigation.getParam('params', 'no params')}</Text>
      </View>
    );
  }
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    /* Same configuration as before */
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

class HomeScreen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Icon
          name='rowing' />
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen1 extends React.Component {
  state = {
    test: '123',
    text: '请输入'
  }
  func = async () =>  {
    // fetch('https://www.baidu.com/').then(r => r.text()).then(r=>{
    //   console.warn(r);
    // })
    let data = await fetch('https://www.baidu.com/');
    let text = await data.text();
    console.warn(text);
    this.setState({ test: text})
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Text>{this.state.test}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go to Home"
        />
        <Button
          onPress={() => {
            this.func();
          }}
          title="run func"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      </View>
    );
  }
}

const BottomTab = createBottomTabNavigator(
  {
    Home: RootStack,
    Settings: SettingsScreen1,
    Settings1: SettingsScreen1
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings1') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        //console.warn(iconName);
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

class MyHomeScreen1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./ip.png')}
        style={[styles1.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen1 extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./ip.png')}
        style={[styles1.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const styles1 = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen1,
  },
  Notifications: {
    screen: MyNotificationsScreen1,
  },
});


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen11 extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles11.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles11.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles11 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({ Home: HomeScreen11, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const SwitchNav = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

class Screen1 extends React.Component {
  state = {
    jsonStr: ''
  }
  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Light Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen2')}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <Button
          title="测试原生Toast模块"
          onPress={() => {
            NativeModules.ToastExample.show('这是一个原生Toast', NativeModules.ToastExample.SHORT);
          }}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <Button
          title="测试原生Jsoup模块"
          onPress={() => {
            //console.warn(NativeModules.ToastExample.show('Awesome', ToastExample.SHORT));
            let html_str = NativeModules.JsoupExample.getHtml((doc)=>{
              NativeModules.ToastExample.show(doc, NativeModules.ToastExample.SHORT);
              //console.warn(doc);
            });
            //console.warn(html_str);
            //NativeModules.ToastExample.show(html_str, NativeModules.ToastExample.SHORT);
          }}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <Button
          title="测试原生图片选择 promise 模块"
          onPress={() => {
            NativeModules.ImagePickerModule.pickImage()
                .then((msg) => {
                    //此处为成功之后回调的信息（指的是：uri.toString() 的值 ）
                    alert(msg);
                 })
               .catch((err) => {
                   //此处为失败之后回调的信息
                    alert(err);
                });
          }}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <Button
          title="测试Api"
          onPress={() => {
            Post('HomeApp', 'userId=xz', (json) => {
              //console.warn(JSON.stringify(json));
              this.setState({jsonStr: JSON.stringify(json) });
            });
          }}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <Button
          title="测试MvcApi"
          onPress={() => {
            var fromData = new FormData();
            fromData.append('appointedId', '1');
            PostMVC('GetOneType', fromData, (json) => {
              //console.warn(JSON.stringify(json));
              this.setState({jsonStr: JSON.stringify(json) });
            });
          }}
          color={Platform.OS === 'android' ? "blue" : "#fff"}
        />
        <ScrollView>
          <Text>
            {this.state.jsonStr}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Screen2 extends React.Component {
  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ecf0f1"
        />
        <Text style={styles.paragraph}>
          Dark Screen
        </Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Screen1')}
        />
      </SafeAreaView>
    );
  }
}

const Test01 = createStackNavigator({
  Screen1: {
    screen: Screen1,
  },
  Screen2: {
    screen: Screen2,
  },
}, {
  headerMode: 'none',
});

const Test02 = createDrawerNavigator({
  Screen1: {
    screen: Screen1,
  },
  Screen2: {
    screen: Screen2,
  },
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    //return <RootStack/>
    // return <BottomTab/>
    return <DrawerNavigator/>
    //return <SwitchNav/>
    //return <Test01/>
    // return <Test02/>
    //return <ScreenReaderStatusExample/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
