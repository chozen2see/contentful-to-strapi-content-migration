const axios = require('axios')

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = `86a03c78b71336d0ecb959f2e70924f6e723b0e6956c347b3c5462da2ab5b6d23e03c6e5a09f727659ca0a76e4a32346d86c767a0b6ffce8700ba2f65b676c079c023a67ff99ef98dced83bd5a572ea49b4bbfa384a6a4e009bf5af0590291e5b88cdb1b19db55cad230bf39c4f38f18e1a61dc101b8fcfd9c8b9a123b5ad13e`;

const data = {
  Name: 'asd Org',
  Slug: 'asd-org',
  URL: 'https://asd.org/',
}

const options = {
  'Content-Type': 'application/json',
  'Authorization': `bearer ${ API_TOKEN }`
};

(async () => {
  console.clear()
  const payload = { data }
  console.log('PAYLOAD:')
  console.log(payload)
  try {
    const response = await axios.post(
      `${ API_URL }/organizations`,
      payload,
      options,
    )
    if (!response) {
      return
    }
    console.log(response.status)
  } catch (error) {
    console.error(error.message)
  }
})();

