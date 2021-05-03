<img src="https://media.giphy.com/media/i2njWo9AQE1pVo7H5x/giphy.gif" height="500">

# Giphy Fetch Lab

## Intro

Now that you have learned how to fetch outside data using React, we are going to practice those skills by interacting with the Giphy API!

You will need to create a new React CodeSandbox project named `giphy-fetch-lab`.

## Setup

To interact with the Giphy API, you will need to sign up for an account at https://giphy.com/. Once you have created an account, follow the steps below:

  - Navigate to https://developers.giphy.com/ and click the `Get Started` button
  - Click the `Create an App` button
  - Select `API` access, **NOT** `SDK`, and click `Next Step`
  - Enter your app's name & description (anything will work) & click `Create App`

You should now see your API Key! Save this for later use.

The endpoint you will be using to search the database of GIFs will be:

```
https://api.giphy.com/v1/gifs/search?api_key=<API_KEY>&q=<SEARCH_TERM>
```


## Exercises

1. Create a `<SearchBar>` component:
	- Needs to contain an input for a user to enter a search term to search the Giphy API

2. Create a `<GifList>` component:
	- When a user enters a search term, only the first 8 results from the API should be displayed in a grid
  	- Each GIF should be rendered as a `<GifListItem>` component (see #2 below)

3. Render each GIF as a `<GifListItem>` component:
	- Each GIF should be displayed as a card, with the title of the GIF below the image as a caption


## Deliverable

#### This lab is not a deliverable.

