# a11y-reporting
An application to scan and display a11y statistics for websites over time.

# Components

## Front-End

[React](https://reactjs.org/), [Next.js](https://nextjs.org/) front-end. Allows you to submit URLs to be scanned and added to the database. Ability to view previously scanned data by URL, slug, and date of scan. Visualizations make use of [d3.js](https://d3js.org/).

The submission page provides feedback indicating whether scan submissions were successful or not.

The data visualization page allows for filtering and drilling down into specific pages and time periods. For each scan, a detailed list of axe violations is present.

### Getting Started
Install dependencies:
```npm install```

Set environment variables. Examples in .env.example.

```npm run dev```
Hosts website at localhost:3000

## Back-End

The API layer features an express server, and handles both page scanning and database storage / retrieval. Accessibility scanning is handled using the [axe-puppeteer](https://github.com/dequelabs/axe-puppeteer) API.

The app uses a MongoDB Database, with the [mongoose](https://mongoosejs.com/) library within the API.

# Documentation
## To-Do
Web Crawling. Currently have tried to use [Apify Puppeteer-Crawler](https://sdk.apify.com/docs/api/puppeteercrawler), but was unable to get puppeteer to launch.
