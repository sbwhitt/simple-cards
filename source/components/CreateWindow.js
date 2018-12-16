'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';
import { Themes } from '../themes/Themes.js';

export let theme = Themes.dark;

//title, onCreate, item
class CreateDeckWindow extends React.PureComponent {
    _onCreate = () => {
        this.props.onCreate(this.props.item);
    }

    render() {
        const { item, title, buttonText } = this.props;
        return (
            <View style={styles.window}>
                <Text style={styles.editWindowTitle}>{title}</Text>
                <View style={{ paddingLeft: 10, paddingRight: 10, }}>
                    <TextInput style={styles.textInput}
                        placeholder='enter deck title'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(input1) => {item.title = input1}} />
                    <TextInput style={styles.textInput}
                        placeholder='enter deck description'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(input2) => {item.desc = input2}} />
                </View>
                <TouchableHighlight
                    style={styles.createButton}
                    onPress={this._onCreate}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

class CreateCardWindow extends React.PureComponent {
    _onCreate = () => {
        this.props.onCreate(this.props.item);
    }

    render() {
        const { item, title, buttonText } = this.props;
        return (
            <View style={styles.window}>
                <Text style={styles.editWindowTitle}>{title}</Text>
                <View style={{ paddingLeft: 10, paddingRight: 10, }}>
                    <TextInput style={styles.textInput}
                        placeholder='enter card question'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(input1) => {item.question = input1}} />
                    <TextInput style={styles.textInput}
                        placeholder='enter card answer'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(input2) => {item.answer = input2}} />
                </View>
                <TouchableHighlight
                    style={styles.createButton}
                    onPress={this._onCreate}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    window: {
        backgroundColor: theme.darkSecondary,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: theme.textPrimary,
        textAlign: 'center',
    },
    editWindowTitle: {
        fontSize: 24,
        color: theme.textPrimary,
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 10,
    },
    textInput: {
        padding: 4,
        marginRight: 5,
        marginLeft: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: theme.darkPrimary,
        borderRadius: 10,
        color: theme.textPrimary,
    },
    createButton: {
        backgroundColor: theme.mediumSecondary,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: theme.mediumSecondary,
        marginTop: 5,
        marginBottom: 10,
        marginRight: 64,
        marginLeft: 64,
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export {
    CreateDeckWindow,
    CreateCardWindow,
}
