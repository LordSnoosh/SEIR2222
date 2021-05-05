<img src="https://images.unsplash.com/photo-1604689598793-b8bf1dc445a1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">

## GA Stock Exchange

Welcome to the General Assembly Stock Exchange!
Today, you are a broker who is trying to better organize the stocks available on the GA Stock Market.

### Setup

First, fork and clone the repo to your local machine, then install all dependencies:
```
$ cd code
$ git clone <link_to_your_repo>
$ cd ga-stock-market
$ npm install
```

We will also be using `JSON-server` to act as a RESTful API that we can use the fetch information about stocks!

```
TO INSTALL: npm install json-server
TO START: json-server --watch db.json
```

After starting the server, you can make a GET request to `http://localhost:3000/stocks` to retrieve the data.

Check out a demo of the completed project here for reference - [Link Here](https://d1pmw.csb.app/)

### Exercises

After the stocks are fetched, complete the following exercises:
1. Render all the stocks onto the page inside of the `<StockContainer>` component.
    - Each stock should be rendered as a `<Stock>` component
    - The styling of how a Stock should look like is already in the `Stock.js` component
2. Allow a user to buy a stock by clicking on a `BUY` button and when it is bought, it should be added to `My Portfolio`.
    - A user should not be able to buy duplicate stocks, only one of each
    - You should calculate and display the current value of the portfolio
3. Allow a user to sell a stock in their `Portfolio` by clicking on the `SELL` button, and it should be removed from their `Portfolio`.

#### Hints
- You will not need to create any extra components. Everything you need is already there for you, just edit the code!
- You will be using the same `<Stock>` component to render the list of all stocks, as well as for the stocks in your portfolio, but you will need to display a different button (BUY vs SELL) on each stock depending on their location. **Sounds like a great opportunity for a ternary statement!**

### Bonus 
1. Allow a user to sort the list of stocks alphabetically by the ticker name as well as by ascending price.
2. Allow a user to filter stocks based on the type of the stock.

Best of luck!


## Deliverable

#### This lab is not a deliverable.
