const fs = require('fs')
const path = require('path')
const contentful = require('contentful-management')
const dotenv = require('dotenv').config()

let environment, client, space
let types
let entries

//

const connect = async () => {
  client = await contentful.createClient({
    accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN
  }) 
  space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
  return await space.getEnvironment('master')
}

//

(async () => {
  console.clear()
  console.log('-= RENCI CONTENT =-')

  // make the connection
  try {
    environment = await connect()
    if (!environment) {
      throw new Error('An error occurred while establishing the connection.')
    }
  } catch (error) {
    console.log(error)
    return
  }
  console.log('Connection established.')

  // Retrieve all content types
  try {
    types = await environment.getContentTypes()
    if (!types) {
      throw new Error('An error occurred while fetching content types')
    }
  } catch (error) {
    console.log(error)
    return    
  }

  // Write types to file
  try {
    await fs.writeFileSync('./content/types.json', JSON.stringify(types, null, 2))
  } catch (error) {
    console.log('An error occurred while writing types to file')
    return
  }

  // retrieve entries
  try {
    const contentPromises = types.items.map(async contentType => await environment.getEntries({ content_type: contentType.sys.id }))
    Promise.all(contentPromises)
      .then(responses => {
        responses.forEach((response, i) => {
          fs.writeFileSync(`./content/${ types.items[i].sys.id }.json`, JSON.stringify(response, null, 2))
          console.log(`Successfully wrote type "${ types.items[i].sys.id }" entries to './content/${ types.items[i].sys.id }.json`)
        })
      })
      .catch(console.log)
  } catch (error) {
    console.log('An error occurred while fetching entries.')
  }
})();
