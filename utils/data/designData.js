import { clientCredentials } from '../client';
import { convertKeysToCamelCase } from '../utilityFunctions';

const dbUrl = clientCredentials.databaseURL;

const getDesigns = (queryParams) => new Promise((resolve, reject) => {
  let url = `${dbUrl}/designs`;
  if (queryParams && (queryParams.room || queryParams.style)) {
    url += '?';
    if (queryParams.room) {
      url += `room=${queryParams.room}`;
      if (queryParams.style) {
        url += `&style=${queryParams.style}`;
      }
    } else {
      url += `style=${queryParams.style}`;
    }
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

const getSingleDesign = (designId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/designs/${designId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

export { getDesigns, getSingleDesign };
