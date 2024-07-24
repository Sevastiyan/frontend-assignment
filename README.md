# Frontend Assignment: Discussion Page

## Assessment Instructions

### Overview

Your task is to create a discussion page using either React.js or Next.js. This page will display discussion content using provided JSON data. The design and features are up to your creativity but should ensure a good user experience across different devices.

### Instructions

1. Use React.js or Next.js to build the discussion page, you are free to design the page however you want.

2. Use the JSON data provided in the folders to populate the page with discussion content.

3. Interface images are supplied locally. Make sure to integrate them into your design.

4. Discussion content images are given as URLs within the data. Ensure these images are displayed correctly.

5. The page must be responsive and provide a good user experience on Desktop, Tablet, and Mobile devices.

6. Give us instructions for how to run your app.

### Additional Guidelines

- Add as many features as you want. Be creative and try to make the page engaging and functional.
- You can draw inspiration from the [Picky discussion page](https://www.gopicky.com/discussion/95315/mega-giveaway-alert-high-chance-of-winning-apply-now) or the Picky app discussion page.
- Feel free to use any design library to enhance your UI/UX.
- Implementing the page using Next.js with Server-Side Rendering (SSR) can earn you bonus points.


---

# Implementation

## Overview

This is a Next.js-based discussion page application that allows users to view and interact with discussion posts and comments. The application features a responsive design, dark mode support, and comment sorting functionality.

## Features

- Display discussion posts with images and user information
- View and add comments to discussions
- Reply to existing comments
- Sort comments by newest, oldest, or most upvoted
- Dark mode toggle for improved readability in low-light conditions
- Responsive design for optimal viewing on various devices

## Technologies Used

- Next.js
- React
- Tailwind CSS

Additional libraries can be used for styling and animations, but I have implemented the most basic styling for this assignment.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
2. Navigate to the project directory
3. Install the dependencies
4. Run the application with the following commands:

```bash
npm install
npm run dev
```

### Running the Application

Once the applicaton is running, you can interact with it in the following way:

1. Open your browser and visit `http://localhost:3000/` to view the application.
2. Click on an item card from the list to view its details.
   - This will take you to the item page located at `pages/item/[itemId].js`
3. The item page will display the item details, including images, description, and comments.

### Comments
1. Comments can be added to the discussion page by adding text in the field and clicking on the "Post Comment" button.
2. Comments can be sorted by newest, oldest, or most upvoted.
3. Comments can be replied to by clicking on the "Reply" button, which will open a new comment form.
4. Comment chains can be collapsed by clicking on the "Collapse" button, which will display the number of replies in each chain.

### Dark Mode
1. The dark mode toggle can be used to switch between light and dark modes.
2. The toggle can be seen in the header of the page, which is sticky and always visible.

### Responsiveness
The page should be responsive and adapt to different screen sizes and orientations.


## React Components

- `Header`: Displays the application header with logo and dark mode toggle.
- `ItemCard`: Displays a card for each item with an image, title, and description.
- `ItemContent`: Displays the main discussion content.
- `Comment`: Renders individual comments and their replies. Replies are nested within the comment component.
- `AddComment`: Provides a form for users to add new comments or replies.
- `SortComments`: Allows users to sort comments based on different criteria.
- `DarkModeToggle`: Enables users to switch between light and dark modes.

## Data Management

Discussion and comment data are currently loaded from JSON files in the `data/` directory. In a production environment, this would typically be replaced with API calls to a backend server.
In addition the data fetching is wrapped in `getServerSideProps` which is used to pre-render the page on the server-side.

## Future Enhancements

- Implement user authentication
- Add real-time updates for new comments (currently comments are only added to the page using state updates, but this could be enhanced by using websockets, or polling the server for new comments)
- Integrate with a backend API for data persistence
- Implement pagination for large numbers of comments
- Add more interactive features like comment editing and deletion
