import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends Component {
	render() {
		return (
			<Image
				style={{
					flex: 1,
    			resizeMode: 'stretch'
				}}
				source={{ uri: 'https://images.pexels.com/photos/177567/pexels-photo-177567.jpeg?w=940&h=650&auto=compress&cs=tinysrgb' }}
			>
				<View style={styles.viewStyle}>
					<Text style={styles.primaryText}>DOBROTA</Text>
					<View style={{ padding: 16 }}>
						<Button
							large
							containerViewStyle={{ margin: 8 }}
							title='Список объявлений'
							color='white'
							backgroundColor='#3498db'
							onPress={() => this.props.navigation.navigate('AnimalListScreen')}
						/>
						<Button
							large
							containerViewStyle={{ margin: 8 }}
							title='Разместить объявление'
							color='white'
							backgroundColor='#2ecc71'
							onPress={() => this.props.navigation.navigate('CreateNewItemScreen')}
						/>
					</View>
				</View>
			</Image>
		);
	}
}

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	primaryText: {
		fontSize: 40,
		padding: 16,
		color: '#383838',
		fontWeight: '200',
		backgroundColor: 'rgba(0,0,0,0)',
	},
	smallText: {
		fontSize: 23,
		padding: 16,
		color: '#383838',
		fontWeight: '200',
	}
});

export default HomeScreen;
