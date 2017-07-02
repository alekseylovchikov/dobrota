import React, { Component } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import { NavigationActions } from 'react-navigation';

class SuccessScreen extends Component {
	componentDidMount() {
		Keyboard.dismiss();
		setTimeout(() => {
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({ routeName: 'HomeScreen' })
				]
			});
			this.props.navigation.dispatch(resetAction);
		}, 2400);
	}

	render() {
		return (
			<View style={styles.viewStyle}>
    		<Text style={styles.smallText}>Спасибо!</Text>
  			<Text style={styles.primaryText}>Объявление успешно размещено</Text>
  		</View>
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
		fontSize: 30,
		color: '#383838',
		fontWeight: '300',
		textAlign: 'center',
	},
	smallText: {
		fontSize: 23,
		color: '#383838',
		fontWeight: '300',
		textAlign: 'center',
	}
});

export default SuccessScreen;
