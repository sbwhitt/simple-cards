'using strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import { Themes } from '../Themes.js';

export let theme = Themes.dark;

class DeckEditMenu extends React.PureComponent {

    _onEdit = () => {
        this.props.onEditPressed();
    }

    _onDelete = () => {
        this.props.onDeletePressed(this.props.item);
    }

    render() {
        return (
            <View style={{backgroundColor: theme.mediumPrimary,}}>
                <TouchableHighlight
                    style={styles.menuOption}
                    onPress={this._onEdit}>
                    <Text style={styles.menuText}>edit deck</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.menuOption}
                    onPress={this._onDelete}>
                    <Text style={styles.menuText}>delete deck</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    descriptionText: {
        fontSize: 18,
        color: theme.textPrimary,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    buttonText: {
        fontSize: 18,
        color: theme.textPrimary,
        textAlign: 'center',
    },
    actionButtonStyle: {
        elevation: 1,
    },
    inputContainer: {
        paddingTop: 10,
    },
    toolbar: {
        height: 56,
    },
    menuOption: {
        backgroundColor: theme.mediumPrimary,
        paddingTop: 16,
        paddingBottom: 16,
    },
    menuText: {
        fontSize: 20,
        color: theme.textPrimary,
        paddingLeft: 20,
    },
});

export default DeckEditMenu;
