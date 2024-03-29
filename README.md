# Auction Page Project

This project is an Auction Page built with Vite and React. It utilizes an API to fetch data and perform CRUD operations on auction items.

## Overview

The Auction Page allows users to perform the following actions:

- Add new auction items.
- Bid on ongoing auctions.
- Remove auctions with no bids associated with them.

## Project Structure

The project is structured as follows:

- **Components:** Contains reusable React components that are imported into pages as needed, passing props where necessary.
- **Pages:** Each page represents a different view or functionality of the application.
- **Context Provider (AuctionApi.jsx):** Manages API calls and provides data to components throughout the application.
- **Styling/Layout:** Bootstrap-React is used for styling and layout.

## How to Run

1. Clone the repository:

```clone
git clone https://github.com/hallstrom91/fwk23s-grupp2-auktion-project
```

2. Install dependencies:

```install
npm install
```

3. Start the development server:

```start
npm run dev
```

4. Navigate to URL:

```navigate
http://localhost:5173
```

## Technologies Used

- Vite
- React
- Bootstrap-React
