'using strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
} from 'react-native';
import { Themes } from '../themes/Themes.js';

let theme = Themes.dark;

class DeckEditWindow extends React.PureComponent {
    _onEdit = () => {
        this.props.onEdit(this.props.item);
    }

    render() {
        const { item, } = this.props;
        return (
            <View style={styles.window}>
                <Text style={styles.editWindowTitle}>editing {item.title}</Text>
                <View style={{ paddingLeft: 10, paddingRight: 10, }}>
                    <TextInput style={styles.textInput}
                        placeholder='change title'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(title) => {item.title = title}} />
                    <TextInput style={styles.textInput}
                        placeholder='change description'
                        placeholderTextColor={theme.darkPrimary}
                        onChangeText={(desc) => {item.desc = desc}} />
                    <TouchableHighlight
                        style={styles.createButton}
                        onPress={this._onEdit}>
                        <Text style={styles.buttonText}>confirm</Text>
                    </TouchableHighlight>
                </View>
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
        borderColor: theme.darkSecondary,
        marginTop: 5,
        marginBottom: 10,
        marginRight: 64,
        marginLeft: 64,
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default DeckEditWindow;

