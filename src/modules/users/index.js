
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
    bindFunctions.call(this, [
      '_onPress'
    ]);
  }

  _onPress () {
    this.props.onPressItem(this.props.item.get('id'));
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
            source={{ uri: item.getIn(['picture', 'thumbnail']) }}
          />
          <View styleName='vertical'>
            <View styleName='horizontal space-between'>
              <Subtitle>{item.getIn(['name', 'first'])}</Subtitle>
              <Caption>{item.get('email')}</Caption>
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
      '_keyExtractor', '_onPressItem',
      '_loadMore'
    ]);
    this.state = {
      selected: null
    };
  }

  componentDidMount () {
    const {users} = this.props;
    if (!users.get('ids').size > 0) {
      const metadata = this.props.users.get('metadata');
      this.props.dispatch(userGetReq({
        page: metadata.get('page'),
        results: metadata.get('results')
      }));
    }
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

  _loadMore () {
    const metadata = this.props.users.get('metadata');
    this.props.dispatch(userGetReq({
      page: metadata.get('page') + 1,
      results: metadata.get('results')
    }));
  }

  render () {
    const {users} = this.props;
    return (
      <View style={{padding: 10}}>
        <FlatList
          data={users.get('ids').toArray()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._itemSeparator}
          keyExtractor={this._keyExtractor}
          onEndReached={this._loadMore}
          extraData={this.state.selected}
        />
      </View>
    );
  }
}

const stateToProps = state => ({
  users: getUsers(state)
});

export default connect(stateToProps, dispatch => ({dispatch}))(Users);
