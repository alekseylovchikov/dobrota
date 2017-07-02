import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Toast,
} from 'native-base';
import Communications from 'react-native-communications';

import Spinner from './common/Spinner';

const uri = 'https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png';

function formatPhoneNumber(number) {
  return number.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '$1 ($2) $3-$4-$5');
}

class ListItems extends Component {
  showToast = () => {
    Toast.show({
      supportedOrientations: ['portrait', 'landscape'],
      text: 'Объявление создано!',
      position: 'top',
      buttonText: 'Ясно'
    })
  };

  renderContanct = (phone, address, email) => {
    return (
      <View>
        <Text style={{ fontSize: 18, paddingBottom: 4 }}>Контакты:</Text>
        <Text style={{ marginBottom: 10 }}>
          {phone || ''}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {address || ''}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {email || ''}
        </Text>
        {phone.length > 0 && (
          <Button
            icon={{ name: 'phone' }}
            backgroundColor='#27ae60'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Связаться'
            onPress={() => {
              Communications.phonecall(phone, true);
            }}
          />
        )}
      </View>
    );
  };

  renderCard = ({ title, description, phone, address, email, imageURL, createdAt }, i) => {
    return (
      <Content key={i}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require('../logo.png')} />
              <Body>
                <Text style={{ fontWeight: '400', fontSize: 22, color: '#383838' }}>{title}</Text>
                {address.length > 0 && <Text note>{address}</Text>}
              </Body>
            </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={{ uri: imageURL || uri }}
                style={{ flex: 1, width: null, height: 220, alignSelf: 'stretch' }}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text>{description}</Text>
                <View style={{ marginTop: 8 }}>
                  {
                    phone.length > 0 &&
                    <View>
                      {/* <Icon name="mail" style={{ color: '#3498db' }} /> */}
                      <Text>Телефон: {formatPhoneNumber(phone)}</Text>
                    </View>
                  }
                  {
                    email.length > 0 &&
                    <View>
                      {/* <Icon name="mail" style={{ color: '#3498db' }} /> */}
                      <Text>Email: {email}</Text>
                    </View>
                  }
                </View>
                {
                  phone.length > 0 &&
                  <View style={{ marginTop: 8 }}>
                    <Button
                      onPress={() => {
                        Communications.phonecall(phone, true);
                      }}
                    >
                      <Text>Позвонить</Text>
                    </Button>
                  </View>
                }
              </Body>
            </CardItem>
         </Card>
      </Content>
      // <Card
      //   key={i}
      //   title={title}
      //   image={{ uri: imageURL || uri }}
      // >
      //   <Text style={{ fontSize: 18, paddingBottom: 4 }}>Описание:</Text>
      //   <Text style={{ marginBottom: 10 }}>
      //     {description}
      //   </Text>
      //   {
      //     (phone.length > 0 || address.length > 0 || email.length > 0) &&
      //     this.renderContanct(phone, address, email)
      //   }
      // </Card>
    );
  };

  render() {
    const { ads, loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (ads.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: '200' }}>Объявлений нет</Text>
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }}>
        {
          ads.map((ad, i) => this.renderCard(ad, i))
        }
      </ScrollView>
    );
  }
}

export default ListItems;
