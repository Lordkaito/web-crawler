# Web Scraping Application with Puppeteer

This application uses Puppeteer to perform web scraping on the Y Combinator news page. It extracts information from each news article and provides functions for sorting and filtering the news.

# Installation

To install the application dependencies, run the following command in your terminal:

`npm install`

You will need node and npm installed on your computer. You can download them from the official website: https://nodejs.org/en/download/

# Usage

### This application is only intended to be used for Y Combinator news page, if you want to use it for another page, you will need to modify the code.

The application provides several functions that you can use:

- index(url): This function visits the provided URL, extracts information from each news article, and returns an array of objects. Each object represents a news article and has the following properties: id, rank, title, points, and comments.

- getDataFromRows(page): This function extracts information from each news article on the provided page.

- orderByCommentsWithMoreThanFiveWords(rows): This function takes an array of news articles and returns a new array that contains only the articles whose title has more than five words. The articles in the new array are sorted by the number of comments, from highest to lowest.

- orderByPointsWithLessThanFiveWords(rows): This function takes an array of news articles and returns a new array that contains only the articles whose title has five words or less. The articles in the new array are sorted by points, from highest to lowest.

You can use the app in two ways:

# Testing

To run the tests, run the following command in your terminal:

`npm test`

You can add your own tests in the tests/ folder or inside the tests/index.test.js file.

# Contributing

This is a project that is part of a technical interview from StackBuilders, so it is not intended to be contributed to. However, feel free to fork the project and adapt it to your needs.
