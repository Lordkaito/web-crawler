# **Web Scraping Application with Puppeteer**

This application uses Puppeteer to perform web scraping on the Y Combinator news page. It extracts information from each news article and provides functions for sorting and filtering the news.

# **Installation**

To install the application dependencies, run the following command in your terminal:
`npm install`

You will need node and npm installed on your computer. You can download them from the official website: https://nodejs.org/en/download/

# **Usage**

**You can use the app in two ways:**

## This application is only intended to be used for Y Combinator news page, if you want to use it for another page, you will need to modify the code.

There is two ways to use this app:
A. You can manually run the code, adding some console.logs into the `index` function in the index.js file to see the outputs and then run `node index.js`. If you want to use this option, please make sure to add `console.log(rows)` at the end of the index function inside the scrap.js file, right before the return statement. This will allow you to see the output of the function in the console.
B. Or you can run `node cli.js` to execute the app in your terminal and be able to interact with it by using simple inputs and see the results in the console.

## Regardless of the option you chose, here is a detail of what you can find:

Inside `scrap.js` file:

1.  `index(url)` function. Takes an argument (the Y Combinator url in our case) and return an array of objects. Each object represents a news article, with id: number, rank: number, title: string, points: number and comments: number properties.
2.  `getDataFromRows(page)` function. This function receives a puppeteer page as an argument. This function is automatically called inside `index(url)` function. This function selects all the rows from the URL, loops over them and add the properties doing some basic conversions (strings to numbers) and parsing to clean titles.
3.  `getArticlesWithMoreThanFiveWords(rows)` function. This function takes an array of articles (rows) as an argument and filters it to return only the articles that has more than 5 words in the title (unordered).
4.  `orderByCommentsWithMoreThanFiveWords(rows)`function. This function takes an array of articles (rows) and returns them sorted by comments (descending). This function uses the `sortByComments` function to sort the articles.
5.  `getArticlesWithLessOrEqualsToFiveWords(rows)`function. This function takes an array of articles (rows) as an argument and filters it to return only the articles that have less or equals to 5 words in the title (unordered).
6.  `orderByPointsWithLessThanFiveWords(rows)`function. This function takes an array of articles (rows) as an argument and returns them sorted by points (descending). This function uses the `sortByPoints` function to sort the articles.
7.  `sortByComments(rows)`function. This functions takes in an array of articles and sorts them by comments in descending order.
8.  `sortByPoints(rows)`function. This functions takes in an array of articles and sorts them by points in descending order.


***Note:*** If you check the structure, you will notice that there is 3 main files: index.js, cli.js and scrap.js.
All the logic related to the scrapping is inside scrap.js.
Everything related to the cli is inside cli.js.
And index.js is only used to be the entry point of the application for you to be able to run `node index.js`

# **Testing**

There is a preset of tests ready for you to run, you can do that by running `npm test` in the terminal.
You can add your own tests in the tests/ folder or inside the tests/index.test.js file.

# **Contributing**

This is a project that is part of a technical interview from StackBuilders, so it is not intended to be contributed to. However, feel free to fork the project and adapt it to your needs.
