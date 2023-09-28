import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '38710040-e4c1e1eb16f2bb925e73b2921';


async function getImagesAPI(requestName, page, per_page) {
  const url = BASE_URL + '?q=' + requestName + '&page=' + page +
    '&key=' + KEY + '&image_type=photo&orientation=horizontal&per_page=' + per_page;
  console.log(requestName);
  const data  = await axios.get(url);
  return data;
}

export default getImagesAPI;
