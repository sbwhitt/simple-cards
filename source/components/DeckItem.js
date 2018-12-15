'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Themes } from '../Themes.js';

export let theme = Themes.dark;

//custom item to render decks using flatlist
//props are item and onPressItem
class DeckItem extends React.PureComponent {
    render() {
        const { item, onPressItem, onPressIcon, } = this.props;
        return (
            <TouchableHighlight style={styles.listItem}
                onPress={onPressItem}>
                <View>
                    <View style={styles.editContainer}>
                        <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                        <MaterialIcons style={{ paddingRight: 15 }}
                            name='edit'
                            size={28}
                            color={theme.textPrimary}
                            onPress={onPressIcon} />
                    </View>
                    <Text style={styles.descriptionText} numberOfLines={1}>{item.desc}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    editContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        fontSize: 24,
        color: theme.textPrimary,
        paddingLeft: 15,
        paddingTop: 20,
        paddingBottom: 20,
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
    listItem: {
        backgroundColor: theme.mediumSecondary,
        borderColor: theme.darkPrimary,
        borderWidth: 1,
        borderRadius: 25,
    },
});

export default DeckItem;
