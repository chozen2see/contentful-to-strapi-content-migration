// RUN CODE
(async () => {
  const getContentfulDataFromFile = (jsonFile) => {
    const data = require(jsonFile)
    
    let contentType = '';
    const dataArr = data.items.map((item, idx) => {
      
      if (idx === 0) contentType = data.items[idx].sys?.contentType?.sys?.id
    
      const itemObj = {}
      for (const field in item.fields) {
        itemObj[field] = item.fields[field]['en-US']
      }
    
      return itemObj
    })
  
    return { dataArr, contentType }
  };
  
  
  // TOOD: Read JSON files from content folder
  // TODO: Create content-type
  
  const addContentToStrapi = async (dataArr, contentType, plural = true) => {
    const axios = require('axios')
    // const dotenv = require('dotenv').config()
  
    const API_URL = 'http://api-staging.renci.org:1337/api';
    const API_TOKEN='506c2e436edb69675ed01dddc34e2369db06c1f40dfbeef55209fa2b7b0a030fe35bb378e8a6aa0392586d700c4e41fe9aa9059033795f32e1ddc74035b9e833ae6138b0f9e07443fa1d5191de3c6d0ff44a7f86e5c802f8c56bf996da4c62964684a078f79d18bbf0727bafa45bbad49883d2ba386cc97cb3e42f82a783cd21'
    // const CONTENTFUL_SPACE_ID='ongrv4q8etpz'
  
    const options = {
      // 'Content-Type': 'application/vnd.contentful.management.v1+json',
      // 'Authorization': `bearer ${ process.env.API_TOKEN }`
      'Content-Type': 'application/json',
      'Authorization': `bearer ${ API_TOKEN }`
    };
  
    for (const data of dataArr) {
      const payload = { data }
      console.log('PAYLOAD:')
      console.log(payload)
      try {
        // const url = `${ API_URL }/spaces/${ CONTENTFUL_SPACE_ID }/environments/development/content_types`
        const url = `${ API_URL }/${ contentType }${plural ? 's' : ''}`
        console.log(url)
        const response = await axios.post(
          url,
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
  };

  console.clear()
  // const contentFolder = './content/';
  // const fs = require('fs');

  // fs.readdir(contentFolder, (err, files) => {
  //   console.log(files)
  //   files.map(file => {
  //     if (file !== '.gitkeep') {
  //       const filePath = contentFolder + file

        const filePath = './content/person.json'
        // Get data from content directory './content/organization.json'
        const { dataArr, contentType } = getContentfulDataFromFile(filePath)
        // Add content to Strapi via API
        if (dataArr.length) addContentToStrapi(dataArr, 'people', false) // contentType
        
  //     };
  //   });
  // });


})();




