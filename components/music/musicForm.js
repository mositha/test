import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { saveMusic } from '../../actions';

class MusicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', albumsCount: '' };
  }

  handleSubmit = e => {
    const { name, albumsCount } = this.state;
    this.props.saveMusic({ name, albumsCount });
  };

  render() {
    return (
      <View>
        <View style={{ padding: 10 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={name => this.setState({ name })}
          />
          <Text style={{ padding: 10, fontSize: 42 }}>{this.state.name}</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={albumsCount => this.setState({ albumsCount })}
          />
          <Text style={{ padding: 10, fontSize: 42 }}>
            {this.state.albumsCount}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.handleSubmit}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { saveMusic }
)(MusicForm);
