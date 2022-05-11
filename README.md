# Contentful-to-Strapi Content Migration Script

## Description

This is the start of a script that will be used to migrate content from one headless CMS to another -- Contentful to Strapi.

First, make sure you have an `.env` file with the following values defined.

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_CONTENT_MANAGEMENT_TOKEN=
```

Run the script with `npm start`.

In its current state, the script will fetch from Contentful all content types, and write the types to `./content/types.json`. It then fetches each content collections, for each type, saving each collection to file, in `./content/<data-type>.json`.
