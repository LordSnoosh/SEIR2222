<img src="https://i.imgur.com/pUDd9Pv.jpg">

# MERN-Stack Hackathon

## Intro

SEI CAFE has only one page-level component remaining to code: `<OrderHistoryPage>`

Your team has the know how to finish SEI CAFE, right here, right now!

## Setup

### Lightweight approach to git team workflow that will ease mob programming during the hackathon

**ONE Team Member needs to do the following:**

- Create a copy of your `~/code/sei-cafe-codealong` folder and name it something like `~/code/sei-cafe-save`.

- `cd ~/code/sei-cafe-codealong`

- Sync with the starter code in the repo as usual:  `git fetch --all` then `git reset --hard origin/main`

- Go to their **personal** GitHub account and create a new **Public** repo named `mern-hackathon`.

- Click the green **[Code]** button, copy the link, and slack it to the other Team Members.

- Add the other Team Members as Collaborators [following these instructions](https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository).

- Once each Team Member (collaborator) accepts the invite emailed to them, they will be able to push directly to the repo - avoiding the necessity to fork the repo and issue pull requests when contributing code!

- Still in your `~/code/sei-cafe-codealong` folder that you synced with earlier, let's remove the current `origin` remote:  `git remote remove origin`.

- Now add a new remote that points to the URL of the new GH repo you provided the other Team Members:  `git remote add origin <paste url here>`

- Run this to push the starter code to the new repo: `git push -u --force origin main`.

- You can rename your `sei-cafe-codealong` folder to `mern-hackathon` if you wish.

Good job!

**All other Team Members do the following:**

- `cd ~/code`

- Clone the repo using the link slacked to them:  `git clone <paste url here>`

- Move into the repo's folder:  `cd mern-hackathon`

- Open the project in VS Code:  `code .`

- The project won't yet run because several required parts of projects are git ignored (**.env**, **node_modules**, etc.).  You'll need to do the following:
  - Copy your **.env** file from **~/code/sei-cafe-codealong** into your new project:  `cp ../sei-cafe-codealong/.env .`
  - **Don't** make any changes in the **.env**, otherwise you won't have menu items and you'll have an invalid token if you change the `SECRET`.
  - Install the Node modules: `npm i`
  - Finally, the Express server needs the **build** folder which holds the production React app that it references in **server.js**.  Build the React app:  `npm run build`

The project should now run - nice!

### Workflow

- Only one Team Member should make changes to the same file.  It's okay to work on DIFFERENT files or add new files.

- Any Team Member can make a commit and push to the repo. However, when any new commit is pushed, ALL other Team Members should immediately `git pull` to update their codebase to the latest version.

## Assignment

Code the `<OrderHistoryPage>` such that it looks (as close as possible) and functions like [the deployed SEI CAFE](https://sei-cafe.herokuapp.com/orders):

<img src="https://i.imgur.com/Evv6VCx.png">

Use the above wireframe/component hierarchy and the deployed app as a guide to implement the following user stories...

### AAU, I want to see a list of summary information for each of my prior orders.

You're basically being asked to implement the **index** functionality for the **orders** resource, .i.e., fetch and render all orders for the logged in user.

> This is a user-centric application, please be sure to render the orders that belong to the logged in user only. 

### AAU, I want to view the details of a previous order when I click on its summary information.

This functionality is similar to the selected category functionality we coded in `<NewOrderPage>`.

> Implementing this user story will be gravy - we already finished coding `<OrderDetail>` and used it in `<NewOrderPage>`. It includes the logic to render an unpaid order (cart in the `<NewOrderPage>`) and a paid order for you in `<OrderHistoryPage>`. 

## Starter Code

The starter code includes a partially coded `<OrderHistoryPage>` that correctly renders the left-hand pane:

<img src="https://i.imgur.com/9dIUV6V.png">

## Hints

- The code we've written together has taught you everything you need to know - be sure to examine the starter code because it provides similar code for everything you need to do.

- Refer to the models for the property names (including virtuals) being rendered. Some data might need to be formatted to match the wireframe.

- Follow the flow when implementing features:
    ```
                                        Order Model
                                             ⇵
    UI → API Module → Server Route → Controller Action
     ⬑ ⟵ ⟵ ⟵ ⟵ ⟵ ⟵ ⟵ ⟵ ⟵ ⟵ JSON Data ↲
    ```

- An `activeOrder` (selected order) functionality is like an `activeCat` (selected category) functionality.

- Don't prioritize the CSS early on. However, examining the CSS of other components will help when the time comes to polish things up.

- Do you remember Lake Arrowhead Homes for Sale where we copied the a `<tr>` element to use as a template for adding a new home to the DOM?  Copying and pasting the React Elements rendered by [the deployed SEI CAFE](https://sei-cafe.herokuapp.com/orders) provides a fantastic starting point for each new component's JSX!

  <img src="https://i.imgur.com/QYrCawZ.png">

## Have Fun!!!