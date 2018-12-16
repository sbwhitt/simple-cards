'using strict';

import React from 'react';
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
            hideAnswer: this.props.item.hideAnswer,
        };
    }

    _onPress = () => {
        this.setState({ hideAnswer: !this.state.hideAnswer });
        console.log(this.props.item);
    }

    render() {
        const { move, moveEnd, onDeletePressed, } = this.props;

        return (
            <TouchableOpacity style={styles.cardItem}
                onPress={this._onPress}
                onLongPress={move}
                onPressOut={moveEnd}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={{ width: 32, }}>
                        <MaterialIcons style={styles.closeIcon} 
                            name='close'
                            color={theme.textPrimary}
                            size={24}
                            onPress={onDeletePressed}/>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Text style={styles.questionText}>{this.state.question}</Text>
                    </View>
                    <View style={{ width: 32, }}>
                    </View>
                </View>
                <Text style={styles.answerText}>{this.state.hideAnswer ? 'tap to reveal answer' : this.state.answer }</Text>
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
        color: theme.textPrimary,
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 20,
    },
    answerText: {
        fontSize: 18,
        color: theme.textPrimary,
        textAlign: 'center',
        paddingBottom: 30,
    },
    closeIcon: {
        paddingTop: 10,
        paddingLeft: 10,
        textAlign: 'right',
    },
});

export default CardItem;
