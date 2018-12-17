'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { CreateCardWindow } from '../components/CreateWindow.js';
import CardItem from '../components/CardItem.js';
import ContextMenu from '../components/ContextMenu.js';
import { Themes } from '../themes/Themes.js';

let theme = Themes.dark;

//main page class, cards not saved until returned to homepage,card indexes very wrong since index isnt being saved
type Props = {};
export default class CardPage extends Component<Props> {
    //navigation options that handles top header title, color, etc.
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: (
                <MaterialIcons style={{ paddingRight: 10, paddingTop: 5, }}
                    name='more-vert'
                    size={28}
                    color={theme.textPrimary}
                    onPress={navigation.getParam('toggleContext')}/>
            ),
            title: params.title,
            headerStyle: { backgroundColor: theme.mediumPrimary },
            headerTitleStyle: { color: theme.textPrimary },
            headerTintColor: theme.textPrimary,
        };
    };

    constructor(props) {
        super(props);
        const { params = {} } = this.props.navigation.state;
        const decks = params.decks;
        const deckIndex = params.index;
        const cards = params.cards;
        this.state = {
            createVisible: false,
            contextVisible: false,
            index: 0,
            decks: decks,
            deckIndex: deckIndex,
            question: '',
            answer: '',
            cards: cards,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ toggleContext: this._toggleContext });
    }

    //called to update the selected deck with any new cards/card positions
    componentWillUnmount() {
        const { params = {} } = this.props.navigation.state;
        params.returnData(params.index, this.state.cards);
    }

    _toggleContext = () => {
        this.setState({ contextVisible: !this.state.contextVisible });
    };

    _sortCards = () => {
        const { params = {} } = this.props.navigation.state;
        var tempArr = this.state.cards.slice();
        //for (var i = 0; i < tempArr.length; i++) tempArr[i].hideAnswer = true;
        tempArr.sort((a, b) => (a.question > b.question) ? 1 : ((b.question > a.question) ? -1 : 0));
        this.setState({ cards: tempArr, contextVisible: !this.state.contextVisible }, 
            () => { params.returnData(params.index, this.state.cards); });
    };

    _shuffleCards = () => {
        const { params = {} } = this.props.navigation.state;
        var tempArr = this.state.cards.slice();
        //for (var i = 0; i < tempArr.length; i++) tempArr[i].hideAnswer = true;
        tempArr.sort((a, b) => (Math.floor(Math.random()*10) > 6) ? 1 : ((Math.floor(Math.random()*10) < 4) ? -1 : 0));
        this.setState({ cards: tempArr, contextVisible: !this.state.contextVisible }, 
            () => { params.returnData(params.index, this.state.cards); });
    };

    //handling card creation
    _createCard = (item) => {
        const { params = {} } = this.props.navigation.state;
        this.setState({ createVisible: !this.state.createVisible });
        if (item.question !== '' && item.answer !== '') {
            item.index = this.state.cards.length;
            this.setState({
                cards: [...this.state.cards, item],
                index: this.state.index+1,
            }, () => { params.returnData(params.index, this.state.cards); });
        };
        //console.log(JSON.stringify(this.state.cards));
        this.setState({ question: '' });
        this.setState({ answer: '' });
    };

    //handling fab press
    _onActionPressed = () => {
        this.setState({ createVisible: !this.state.createVisible });
    };

    //similar to home page, conditionally renders based on card creation
    _renderIfCreating = () => {
        if (!this.state.createVisible) {
            return (
                <ActionButton style={styles.actionButtonStyle}
                    buttonColor={theme.darkSecondary}
                    position='right'
                    onPress={this._onActionPressed}
                    size={64}>
                </ActionButton>
            );
        }
    };

    //deleting card at index
    _deleteCard = (index) => {
        const { params = {} } = this.props.navigation.state;
        var tempArr = this.state.cards.slice();
        tempArr.splice(index, 1);
        this.setState({ cards: tempArr }, () => { params.returnData(params.index, this.state.cards); });
    };

    //producing unique keys for card items
    _keyExtractor = (item, index) => String(index);

    //render item for draggable flatlist
    _renderItem = ({ item, index, move, moveEnd, isActive }) => {
        console.log(item);
        return (
            <CardItem
                item={item}
                index={index}
                move={move}
                moveEnd={moveEnd}
                onDeletePressed={() => { this._deleteCard(index) }} />
        );
    };

    //main render function for deckpage
    render() {
        const { params = {} } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <ContextMenu
                    toggleContext={this._toggleContext}
                    contextVisible={this.state.contextVisible}
                    sortCards={this._sortCards}
                    shuffleCards={this._shuffleCards}/>
                <Modal isVisible={this.state.createVisible}
                    animationIn='slideInUp'
                    backdropColor={theme.darkPrimary}
                    backdropOpacity={0.7}
                    onRequestClose={() => { this.setState({ createVisible: !this.state.createVisible }); }}
                    onBackdropPress={() => { this.setState({ createVisible: !this.state.createVisible }); }}>
                    <CreateCardWindow item={{ question: '', answer: '', index: null, hideAnswer: true, }}
                        title='create a card'
                        buttonText='create'
                        onCreate={this._createCard} />
                </Modal>
                <DraggableFlatList
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    scrollPercent={5}
                    keyExtractor={item => item.question}
                    onMoveEnd={({ data }) => this.setState({ cards: data }, () => {
                        params.returnData(params.index, this.state.cards);
                    })} />
                {this._renderIfCreating()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontSize: 18,
        color: theme.textPrimary,
    },
    actionButtonStyle: {
        elevation: 10,
    },
    buttonText: {
        fontSize: 18,
        color: theme.textPrimary,
        textAlign: 'center',
    },
});
