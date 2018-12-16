'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';

import { Themes } from '../themes/Themes.js';

export let theme = Themes.dark;

class ContextMenu extends React.PureComponent {
    render() {
        const { toggleContext, contextVisible, sortCards, shuffleCards } = this.props;
        return (
            <Modal isVisible={contextVisible}
                animationIn='fadeIn'
                animationInTiming={150}
                animationOut='fadeOut'
                animationOutTiming={150}
                backdropOpacity={0.0}
                onRequestClose={toggleContext}
                onBackdropPress={toggleContext}>
                <View style={styles.contextMenu}>
                    <TouchableHighlight style={styles.contextOption}
                        onPress={sortCards}>
                        <Text style={styles.contextOptionText}>sort cards alphabetically</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.contextOption}
                        onPress={shuffleCards}>
                        <Text style={styles.contextOptionText}>shuffle cards</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    contextMenu: {
        backgroundColor: theme.mediumPrimary,
        marginBottom: 400,
        paddingLeft: 5,
        alignSelf: 'flex-end',
        elevation: 5,
    },
    contextOption: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    contextOptionText: {
        color: theme.textPrimary,
        fontSize: 20,
        paddingRight: 20,
        paddingLeft: 5,
    },
});

export default ContextMenu;
