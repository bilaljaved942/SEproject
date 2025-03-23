import axios from 'axios';

axios.get('http://localhost:5000/api/hotels')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });
