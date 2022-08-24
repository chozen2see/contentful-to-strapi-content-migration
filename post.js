const axios = require('axios')
// const dotenv = require('dotenv').config()


const API_URL = 'http://localhost:1337/api';
const API_TOKEN='f6da01d833db762f26840fb980c9a8248e2b7d4b2aeb6ae9f82beb4516339d1f05d7f0339b070fc0177a38918f8fe0c372d5765659f4c2f51137c5bb4e7d29f3a2a0b78f24f6d5d2ea14e7085de4e2fe7b949875680a304647421cc216d91bb48fd23fc76832c92bf979633911a7073333896ab688368a0cfec269e7d161f0f1'

const data = {
  Name: 'asa Org',
  Slug: 'asa-org',
  URL: 'https://asa.org/',
}

const dataArr = [
  {
    Name: 'test Org 1',
    Slug: 'test-org-10',
    URL: 'https://test-1.org/',
  },
  {
    Name: 'test Org 2',
    Slug: 'test-org-20',
    URL: 'https://test-2.org/',
  },
  {
    Name: 'test Org 3',
    Slug: 'test-org-30',
    URL: 'https://test-3.org/',
  },
]

const options = {
  'Content-Type': 'application/json',
  // 'Authorization': `bearer ${ process.env.API_TOKEN }`
  'Authorization': `bearer ${ API_TOKEN }`
};

// TOOD: Read JSON files from content folder
// TODO: Create content-type



(async () => {
  console.clear()
  // Add entries to content
  for (const data of dataArr) {
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
  }
})();

