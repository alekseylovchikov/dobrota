import { firebaseApp } from '../config/firebase';

export const fetchAds = () => {
  return dispatch => {
    dispatch({ type: 'START_LOADING' });
    firebaseApp.database().ref('/ads')
      .on('value', snap => {
        let ads = [];
        snap.forEach(ad => {
          const { title, description, phone, address, email, imageURL, createdAt } = ad.val();
          ads.push({ title, description, phone, address, email, imageURL, createdAt });
        });
        dispatch({ type: 'END_LOADING' });
        const sortByDate = ads.sort(function(a, b) {
          var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        console.log(sortByDate);
        dispatch({
          type: 'FETCH_ADS',
          payload: sortByDate
        });
      });;
  };
};
