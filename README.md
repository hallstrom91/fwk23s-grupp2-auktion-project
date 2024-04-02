# Auction Page Project

This project is an Auction Page built with Vite and React. It utilizes an API to fetch data and perform CRUD operations on auction items.

## Project Overview

### Home.jsx

- Welcome Page

### Auctions.jsx

- Displays active/closed auctions separately
- Search functionality to display all auctions
- Navigate to individual auctions

### ViewAuction.jsx

- Displays detailed information about a single auction, including description, seller, etc.
- Allows users to place bids
- Allows users to delete auctions (if no bids are present)
- Allows user to change auction information (if active)
- If auction is closed, removes all bids except the highest/winning bid, - and hides buttons for placing bids/deleting auction/changing auction

### Create.jsx

- Page for creating a new auction
- Start date defaults to current time
- End date defaults to maximum of 13 days from current date

### AuctionApi.jsx

- Contains all API calls, can be imported as functions where needed
- Includes function to calculate auction time

### Components

- AddAuction.jsx
- AuctionContainer.jsx
- DeleteAuctionBtn.jsx
- Footer.jsx
- LoadingSpinner.jsx
- Navigation.jsx
- PlaceBidBtn.jsx
- UpdateAuctionBtn.jsx
- SearchAuctions.jsx
- ViewAuctionBids.jsx
- ViewAuctionInfo.jsx

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
