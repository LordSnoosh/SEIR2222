<img src="https://i.imgur.com/Gd2y6TU.jpg" width="900">

# Deploying Your Static App to GitHub-Pages

## Intro

This quick walk-thru will show you how easy it is to deploy your static web application so that it can be accessed by anyone with Internet access, anywhere in world!

Any GitHub repository containing an _index.html_ and other static assets can become a website by simply creating a _gh-pages_ branch and pushing it to the _origin_ remote.

## What is a _static_ application?

A _static_ application is an application that consists solely of **static assets**.

Static assets are files that are not "processed" by the web server in any way, they are simply delivered by the web server as they are requested by the browser.

Typical **static assets** include:
	
- **html** files
- **css** stylesheets
- **javascript** files
- **image** files

## Deploying with ghpages

#### Ensure your project is ready to deploy

Make sure that your project is working - it does not make sense to deploy a broken app!

Next, make sure that all changes to your code are committed to _master_ in your local repository.

Although not necessary, go ahead and push the latest commit to _origin_:<br>`git push origin master`

#### Create a `gh-pages` Branch

You will learn more about git **branches** during Project 3, however, deploying on _ghpages_ requires that we create a new branch:

- Ensure that you're in your project's directory and in the `master` branch
- Run `git checkout -b gh-pages`

#### Deploy the `gh-pages` Branch

All that's left to get the app deployed is to push the `gh-pages` branch to the `origin` remote:<br>`git push origin gh-pages`

## Browsing to the WebSite

Your website should now be up and running at the following URL:<br>`https://<user-name>.github.io/<repo-name>/`

Be sure to substitute **your GitHub user-name** for `<user-name>` and **your project's repo name** for `<repo-name>`.

>Note: It might take up to 15 minutes for the app to be available.

## Updating your Application's Deployment

Now that your repo has two branches, be sure to **continue development on the `master` branch**.

`git checkout master` switches to the `master` branch.

When you have commits on `master` that you want to deploy, it's time to **merge** those commits into the `gh-pages` branch:

- Checkout the `gh-pages` branch: `git checkout gh-pages`
- Merge the commits from `master`: `git merge master`
- Deploy the changes: `git push origin gh-pages`

Now your deployed application is up to date!

Be sure to switch back to the `master` branch!

## Troubleshooting

It's not uncommon to have a problem with a deployed app that runs perfectly in the local development environment.

### Using `https` is Required

The most common situation occurs because hosted applications are "served" via the **https** protocol vs. **https** during development.

For example, any hard-coded **http** URLs in the source code will not load due to [Mixed Content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content)  errors - the following `<img>` tag will load the image locally but not when deployed:

```html
<img src="http://example.com/image.png">
```

The solution is to either specify **https** explicitly:

```html
<img src="https://example.com/image.png">
```

or leave off the protocol entirely:

```html
<img src="//example.com/image.png">
```

> IMPORTANT:  The Network tab in DevTools is extremely helpful running down the above and other loading errors.

### Casing of Directories & Filenames Matter 

Although the casing of directory and filenames usually doesn't matter during development locally, it does matter with most hosting services such as GitHub Pages and Heroku.

For example, let's say you have the following project structure:

```
/project-1
    /css
        main.css
    /JS
        main.js
    index.html
```

The following will work during development (locally):

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Great Game</title>
  <link rel="stylesheet" href="css/style.css">
  <script defer src="js/main.js"></script>
<head>
```

However, `js/main.js` will fail to load due to the fact that the `JS` directory is capitalized requiring the `<script>` tag to be:

```html
  <script defer src="JS/main.js"></script>
```

#### How to Rename Directories & Files

If you want to change the casing of a directory or file, `git` will not "see" a casing change unless this process is followed:

1. Rename the directory or file to something different.  For example, to correct the above, you would need to rename the `JS` directory to something like `js-temp`.
2. Make a commit.
3. Now you can rename the directory/file correctly, `js` in this case.
4. Make a commit and you're good to go.


