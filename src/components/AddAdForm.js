import React, { Component } from 'react';
import { Text, View, ScrollView, Platform } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import CryptoJS from 'crypto-js';
// firebase
import { firebaseApp } from '../config/firebase';
// image upload config
const config = {
  cloud_name: 'fruitdev',
  api_key: '413329573937317',
  api_secret: 'wPx9WMAvFaO_bbsX6VGBN2pOBx0'
};

function uploadImage(uri) {
  let timestamp = (Date.now() / 1000 | 0).toString();
  let api_key = config.api_key;
  let api_secret = config.api_secret;
  let cloud = config.cloud_name;
  let hash_string = 'timestamp=' + timestamp + api_secret
  let signature = CryptoJS.SHA1(hash_string).toString();
  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'
	let imageURL = '';

  let xhr = new XMLHttpRequest();
  xhr.open('POST', upload_url);
  xhr.onload = () => {
		imageURL = JSON.parse(xhr._response).url;
	};
  let formdata = new FormData();
  formdata.append('file', { uri: uri, type: 'image/png', name: 'upload.png' });
  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);
  xhr.send(formdata);
	return imageURL;
}

import Spinner from './common/Spinner';
import ImgPicker from './common/ImgPicker';

class AddAdForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			phone: '',
			address: '',
			email: '',
			loading: false,
			err: null,
			uri: null,
			base64: null,
			imageURL: null,
		};
	}

	handleUploadImage = (uri) => {
		const { title, description, phone, address, email } = this.state;
    // const createdAt = ;
    // console.log(createdAt);
		if (uri) {
			let timestamp = (Date.now() / 1000 | 0).toString();
		  let api_key = config.api_key;
		  let api_secret = config.api_secret;
		  let cloud = config.cloud_name;
		  let hash_string = 'timestamp=' + timestamp + api_secret;
		  let signature = CryptoJS.SHA1(hash_string).toString();
		  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';
		  let xhr = new XMLHttpRequest();
		  xhr.open('POST', upload_url);
		  xhr.onload = () => {
				firebaseApp.database().ref('/ads')
					.push({ title, description, phone, address, email, imageURL: JSON.parse(xhr._response).url, createdAt: +new Date() })
					.then(() => {
						this.setState({
							loading: false,
							title: '',
							phone: '',
							email: '',
							address: '',
							description: '',
							uri: null,
							err: null,
						});
						this.props.success();
					})
					.catch(err => this.setState({ loading: false, err }));
			};
		  let formdata = new FormData();
		  formdata.append('file', { uri: uri, type: 'image/png', name: 'upload.png' });
		  formdata.append('timestamp', timestamp);
		  formdata.append('api_key', api_key);
		  formdata.append('signature', signature);
		  xhr.send(formdata);
		} else {
			firebaseApp.database().ref('/ads')
				.push({ title, description, phone, address, email, imageURL: '', createdAt: +new Date() })
				.then(() => {
					this.setState({
						loading: false,
						title: '',
						phone: '',
						email: '',
						address: '',
						description: '',
						uri: null,
						err: null,
					});
					this.props.success();
				})
				.catch(err => this.setState({ loading: false, err }));
		}
	};

	handleCreateAd = () => {
		const { title, description, phone, address, email, uri, base64 } = this.state;
		const uploadUri = () => {
			if (uri) {
				return Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
			} else {
				return null;
			}
		};
		if (title.length && description.length) {
			this.setState({ loading: true, err: null });
			this.handleUploadImage(uploadUri());
		}
	};

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Заголовок</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Описание</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Телефон для связи</Label>
              <Input
                keyboardType="phone-pad"
                maxLength={11}
                style={styles.inputStyle}
                autoCorrect={false}
                value={this.state.phone}
                onChangeText={phone => this.setState({ phone })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Адрес</Label>
              <Input
                style={styles.inputStyle}
                autoCorrect={false}
                value={this.state.address}
                onChangeText={address => this.setState({ address })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Ваш email</Label>
              <Input
                keyboardType="email-address"
                style={styles.inputStyle}
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <View style={{ flex: 1 }}>
              <ImgPicker getUri={(uri, base64) => this.setState({ uri, base64 })} />
      			</View>
            <View style={{ marginTop: 8 }}>
              <Button large full success onPress={this.handleCreateAd}>
                <Text style={{ color: '#fff' }}>Разместить</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
      // <ScrollView style={{ flex: 1 }}>
      //
      // 	{/* <View>
      // 		<FormLabel>Заголовок объявления</FormLabel>
			// 		<FormInput
			// 			onChangeText={value => this.setState({ title: value })}
			// 			value={this.state.title}
      //       placeholder="Пример: Найден кот"
			// 		/>
			// 		{
			// 			this.state.err && this.state.err.name &&
			// 			<FormValidationMessage>
			// 				{this.state.err.name}
			// 			</FormValidationMessage>
			// 		}
      // 	</View>
      // 	<View>
      // 		<FormLabel>Описание</FormLabel>
			// 		<FormInput
			// 			onChangeText={value => this.setState({ description: value })}
			// 			value={this.state.description}
      //       placeholder="Пример: Найден рыжий кот"
			// 		/>
      // 	</View>
      // 	<View>
      // 		<FormLabel>Телефон для связи</FormLabel>
			// 		<FormInput
			// 			onChangeText={value => this.setState({ phone: value })}
			// 			value={this.state.phone}
      //       placeholder="Пример: 8 900 111 22 33 (необязательно)"
			// 		/>
      // 	</View>
      //   <View>
      // 		<FormLabel>Адрес</FormLabel>
			// 		<FormInput
			// 			onChangeText={value => this.setState({ address: value })}
			// 			value={this.state.address}
      //       placeholder="Укажите адрес (необязательно)"
			// 		/>
      // 	</View>
      //   <View>
      // 		<FormLabel>Ваш email</FormLabel>
			// 		<FormInput
			// 			onChangeText={value => this.setState({ email: value })}
			// 			value={this.state.email}
      //       placeholder="Укажите ваш email (необязательно)"
			// 		/>
      // 	</View>
			// 	<View>
			// 		<ImgPicker getUri={(uri, base64) => this.setState({ uri, base64 })} />
			// 	</View>
      // 	<Button
			// 		large
			// 		containerViewStyle={{ margin: 8 }}
			// 		title='Разместить'
			// 		color='white'
			// 		backgroundColor='#2ecc71'
			// 		onPress={this.handleCreateAd}
			// 	/> */}
      // </ScrollView>
    );
  }
}

const styles = {
  inputStyle: { paddingLeft: 5 },
};

export default AddAdForm;
