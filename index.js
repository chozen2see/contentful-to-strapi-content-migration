const contentful = require('contentful-management')
const dotenv = require('dotenv').config()

let env, client, space
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
    env = await connect()
  } catch (error) {
    console.log('An error occurred while attempting to establish a connection.')
    return
  }
  console.log('Connection established.')

  // retrieve entries
  try {
    entries = await env.getEntries()
    console.log(entries)
  } catch (error) {
    console.log('An error occurred while attempting to get entries.')
  }
  console.log(`Retrieved ${ entries.items.length } entries.`)
  console.log(entries.items.map(item => item.fields))

})()