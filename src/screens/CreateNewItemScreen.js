import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

// components
import AddAdForm from '../components/AddAdForm';

class CreateNewItemScreen extends Component {
	reset = () => {
		const resetAction = NavigationActions.reset({
  		index: 0,
			actions: [
			NavigationActions.navigate({ routeName: 'SuccessScreen' })
		]
		});
		this.props.navigation.dispatch(resetAction);
	};

	render() {
		return (
			<View style={styles.viewStyle}>
  			<AddAdForm success={() => this.reset()} />
  		</View>
		);
	}
}

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1,
		justifyContent: 'space-between',
		paddingLeft: 8
	},
});

export default CreateNewItemScreen;
