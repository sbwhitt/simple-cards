'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Themes } from '../Themes.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export let theme = Themes.dark;

//custom card item class that is rendered in draggable flatlist
//props are item, move, moveEnd
class CardItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            question: this.props.item.question,
            answer: this.props.item.answer,
            hideAnswer: true,
            isEditing: false,
        };
    }

    _onPress = () => {
        this.setState({ hideAnswer: !this.state.hideAnswer })
    }

    render() {
        const { move, moveEnd, } = this.props;

        const closeIcon = 
            <MaterialIcons style={styles.closeIcon} 
                name='close'
                color={theme.lightPrimary}
                size={24}
                onPress={this.props.onDeletePressed}/>;

        const questionField = this.state.isEditing ?
            <TextInput
                style={styles.questionText}
                placeholder={this.state.question}
                placeholderTextColor={theme.lightPrimary}
                onChange={(text) => {this.setState({ question: text })}} />
            : <Text style={styles.questionText}>{this.state.question}</Text>;

        const answerField = this.state.isEditing ?
            <TextInput
                style={styles.answerText}
                placeholder={this.state.answer}
                placeholderTextColor={theme.lightPrimary}
                onChange={(text) => {this.setState({ answer: text })}} />
            : <Text style={styles.answerText}>{this.state.hideAnswer ? 'tap to reveal answer' : this.state.answer }</Text>;

        return (
            <TouchableOpacity style={styles.cardItem}
                onPress={this._onPress}
                onLongPress={move}
                onPressOut={moveEnd}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ width: 32, }}>
                        {closeIcon}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        {questionField}
                    </View>
                    <View style={{ width: 32, }}>
                    </View>
                </View>
                {answerField}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardItem: {
        backgroundColor: theme.mediumSecondary,
        borderWidth: 1,
        borderColor: theme.darkPrimary,
    },
    questionText: {
        fontSize: 24,
        color: theme.lightPrimary,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 20,
    },
    answerText: {
        fontSize: 18,
        color: theme.lightPrimary,
        textAlign: 'center',
        paddingBottom: 30,
    },
    closeIcon: {
        paddingTop: 10,
        paddingLeft: 10,
        textAlign: 'right',
    },
    editIcon: {
        paddingTop: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
});

export default CardItem;
