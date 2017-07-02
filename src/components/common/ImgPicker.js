import React from 'react';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Button } from 'react-native-elements';

export default class ImgPicker extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 }}>
        <View style={{ flex: 1, marginBottom: 10 }}>
          <Button
            large
            title="Загрузить фото"
            onPress={this._pickImage}
          />
        </View>
        {
          image &&
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={{ flex: 1, width: null, height: 200, alignSelf: 'stretch' }}
          />
        }
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.getUri(result.uri, result.base64);
    }
  };
}
