
import React, {Component} from 'react';
import {
  Divider, View, Subtitle,
  TouchableOpacity, Row, Image,
  Caption
} from '@shoutem/ui';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {userGetReq} from './action';
import {getUsers} from './store';
import {bindFunctions} from '../../utils';

class MyListItem extends Component {
  constructor () {
    super();
    this._onPress = this._onPress.bind(this);
  }

  _onPress () {
    this.props.onPressItem(this.props.item.id);
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.selected !== this.props.selected;
  }

  render () {
    const backgroundColor = `${this.props.selected ? 'limegreen' : 'white'}`;
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <Row style={{backgroundColor}}>
          <Image
            styleName='small-avatar top'
            source={{ uri: item.picture.thumbnail }}
          />
          <View styleName='vertical'>
            <View styleName='horizontal space-between'>
              <Subtitle>{item.name.first}</Subtitle>
              <Caption>{item.email}</Caption>
            </View>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}

class Users extends Component {
  constructor (props) {
    super(props);
    bindFunctions.call(this, [
      '_renderItem', '_itemSeparator',
      '_keyExtractor', '_onPressItem'
    ]);
    this.state = {
      selected: null
    };
  }

  componentDidMount () {
    this.props.dispatch(userGetReq());
  }

  _onPressItem (id) {
    this.setState({selected: id});
  }

  _renderItem ({item}) {
    const {users} = this.props;
    return (
      <MyListItem
        onPressItem={this._onPressItem}
        selected={item === this.state.selected}
        item={users.get('listById').get(item)}
      />
    );
  }

  _itemSeparator () {
    return (
      <Divider styleName='line' />
    );
  }

  _keyExtractor (item) {
    return item;
  }

  render () {
    const {users} = this.props;
    return (
      <View style={{padding: 20}}>
        <FlatList
          data={users.get('ids').toArray()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._itemSeparator}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const stateToProps = state => ({
  users: getUsers(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Users);
