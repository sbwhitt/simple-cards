'using strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';

import DeckItem from '../components/DeckItem.js';
import DeckEditWindow from '../components/DeckEditWindow.js';
import DeckEditMenu from '../components/DeckEditMenu.js';
import { CreateDeckWindow } from '../components/CreateWindow.js';
import { Themes } from '../themes/Themes.js';

let theme = Themes.dark;

type Props = {};
export default class HomePage extends Component<Props> {
    static navigationOptions = {
        title: 'simple cards',
        headerStyle: { backgroundColor: theme.mediumPrimary },
        headerTitleStyle: { color: theme.textPrimary },

    };
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            isEditing: false,
            editMenu: false,
            decks: null,
            index: null,
            title: '',
            desc: '',
            current: '',
        };
        //this.resetDecks();
        //proper beahavior depends on accurate values of current index and the deck array
        this.retrieveDecks('decks');
        this.retrieveIndex('index');
    }

    //debug function used to reset asyncstorage contents
    resetDecks() {
        this.storeItem('decks', []);
        this.storeItem('index', 0);
    }
    //

    //storing and retrieving decks from asyncstorage
    async storeItem(key, item) {
        try {
            var jsonItem = await AsyncStorage.setItem(key, JSON.stringify(item));
            return jsonItem;
        }
        catch (error) {
            console.log(error.message);
        }
    }

    //retrieving array of decks from asyncstorage
    async retrieveDecks(key) {
        const empty = [];
        try {
            const retrieved = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrieved);
            if (item !== null) this.setState({ decks: item });
            else this.setState({ decks: [] });
            return item;
        }
        catch (error) {
            console.log(error.message);
            return empty;
        }
    }

    //retrieving current index from asyncstorage
    async retrieveIndex(key) {
        const empty = [];
        try {
            const retrieved = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrieved);
            if (item !== null) this.setState({ index: item });
            else this.setState({ index: 0 });
            return item;
        }
        catch (error) {
            console.log(error.message);
            return empty;
        }
    }

    //function used in child screens to update decks in home screen
    returnData = (index, cards) => {
        const decksCopy = this.state.decks.slice();
        if (decksCopy.length !== 0) decksCopy[index].cards = cards;
        this.setState({ decks: decksCopy }, () => { this.storeItem('decks', this.state.decks); });
    };

    //function that handles the creation of new decks
    _createDeck = (item) => {
        this.setState({ isCreating: !this.state.isCreating });

        if (item.title !== '') {
            this.setState({ index: this.state.index + 1 }, () => {
                this.storeItem('index', this.state.index);
            });
            item.index = this.state.index;
            this.setState({
                decks: [...this.state.decks, item]
            }, () => { this.storeItem('decks', this.state.decks); });
        }
        this.setState({ title: '' });
        this.setState({ desc: '' });
    };

    //called when confirm button is pressed on edit window screen
    _editDeck = (item) => {
        const index = item.index;
        const decksCopy = this.state.decks.slice();
        decksCopy[index] = item;
        this.setState({ decks: decksCopy }, () => { this.storeItem('decks', this.state.decks); });
        this.setState({ isEditing: !this.state.isEditing }, () => { this.setState({ editMenu: !this.state.editMenu }) });
    };

    //floating action button onpress function
    _onActionPressed = () => {
        this.setState({ isCreating: !this.state.isCreating });
    };

    //handling deck presses, navigate to deck screen while passing deck data
    _onDeckPressed = (deck) => {
        this.props.navigation.navigate('Card', {
            decks: this.state.decks,
            title: deck.title,
            index: deck.index,
            cards: deck.cards,
            returnData: this.returnData.bind(this),
        });
    };

    //handling edit icon press
    _onIconPressed = (item) => {
        this.setState({ current: item });
        this.setState({ editMenu: !this.state.editMenu });
    };

    //resets deck menu visibility booleans
    _closeDeckEditMenu = () => {
        this.setState({ editMenu: false });
        this.setState({ isEditing: false });
    }

    //displays edit deck window when edit option is chosen
    _onEditPressed = () => {
        this.setState({ isEditing: !this.state.isEditing });
    }

    //deleting selected deck by splicing the deck's index
    _onDeletePressed = (item) => {
        const index = item.index;
        var decksCopy = this.state.decks.slice();
        decksCopy.splice(index, 1);
        for (i = 0; i < decksCopy.length; i++) {
            decksCopy[i].index = i;
        }
        this.setState({ decks: decksCopy }, () => { this.storeItem('decks', this.state.decks); });
        this.setState({ index: decksCopy.length }, () => { this.storeItem('index', this.state.index); });
        this.setState({ editMenu: false });
    }

    //renders action button if no deck is being created
    _renderIfCreating = () => {
        if (!this.state.isCreating) {
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

    //flatlist function used to produce unique keys for each list item using deck index in this.state.decks
    _keyExtractor = (item, index) => String(index);

    //render item function for flatlist, renders custom list item
    _renderItem = ({ item }) => (
        <DeckItem
            item={item}
            onPressItem={() => this._onDeckPressed(item)}
            onPressIcon={() => this._onIconPressed(item)} />
    );

    //main render function for homepage
    render() {
        const modalWindow = this.state.isEditing ?
            <DeckEditWindow
                item={this.state.current}
                onEdit={this._editDeck} /> :
            <DeckEditMenu 
                item={this.state.current}
                onEditPressed={this._onEditPressed}
                onDeletePressed={this._onDeletePressed} />;

        if (this.state.decks == null || this.state.index == null) return (<Text style={styles.descriptionText}>loading...</Text>);
        else return (
            <View style={styles.container}>
                <Modal isVisible={this.state.editMenu}
                    animationIn='slideInUp'
                    backdropColor={theme.darkPrimary}
                    backdropOpacity={0.7}
                    onRequestClose={this._closeDeckEditMenu}
                    onBackdropPress={this._closeDeckEditMenu}>
                    {modalWindow}
                </Modal>
                <Modal isVisible={this.state.isCreating}
                    animationIn='slideInUp'
                    backdropColor={theme.darkPrimary}
                    backdropOpacity={0.7}
                    onRequestClose={() => { this.setState({ isCreating: !this.state.isCreating }); }}
                    onBackdropPress={() => { this.setState({ isCreating: !this.state.isCreating }); }}>
                    <CreateDeckWindow item={{ title: '', desc: '', index: null, cards: [], }}
                        title='create a deck'
                        buttonText='create'
                        onCreate={this._createDeck} />
                </Modal>
                <FlatList
                    data={this.state.decks}
                    extraData={this.state.decks}
                    renderItem={this._renderItem}
                    keyExtractor={item => item.title} />
                {this._renderIfCreating()}
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
