import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

// components
import ListItems from '../components/ListItems';

import { fetchAds } from '../actions/ads';

class AnimalListScreen extends Component {
	componentWillMount() {
		this.props.fetchAds();
	}

	render() {
		const { ads } = this.props;
		return (
			<View style={styles.viewStyle}>
				<ListItems ads={ads} loading={this.props.loading} />
				<Button
					large
					containerViewStyle={{ margin: 8 }}
					title='Разместить объявление'
					color='white'
					backgroundColor='#2ecc71'
					onPress={() => this.props.navigation.navigate('CreateNewItemScreen')}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	viewStyle: {
		flex: 1
	},
	primaryText: {
		fontSize: 40,
		color: '#383838',
		fontWeight: '200',
	},
	smallText: {
		fontSize: 23,
		color: '#383838',
		fontWeight: '200',
	}
});

const mapStateToProps = state => ({
	ads: state.ads.adsList,
	loading: state.ads.loading
});

export default connect(mapStateToProps, { fetchAds })(AnimalListScreen);
