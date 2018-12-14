import React, { Component } from 'react';
import { Text,View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default class HelloWorldApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }
    
    render() {
        return (
            <View>
                <Text>Hello world!</Text>
                <Button
                    title="LOADING BUTTON"
                    onPress={()=>{
                        this.setState({isLoading: !this.state.isLoading});
                    }}
                    loading={this.state.isLoading}
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
                <Button
                    title="红屏"
                    onPress={()=>{
                        console.error('报错');
                        
                    }}
                    loading={this.state.isLoading}
                    loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                />
            </View>
        );
    }
}