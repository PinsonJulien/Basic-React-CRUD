# Basic React CRUD application

## Scope

### Requirements

Creating a simple CRUD application using React and JSONPlaceholder API.
- Retrieve and display a list of posts (user, title, body)
- Create a new post (showing a simple form in place that submit data) displaying the created data when submitted
- Delete a post (with a button for each element in the list)
- Show some design skills using either pure CSS or a framework

### Bonus 

- Update a post (with a button for each element in the list, showing a form in place with data to update), it will refresh the element on success.
- Use a database or local storage to store the data
- deploy

## Design choices

This application is built using React with TypeScript. I used the Vite build tool, because of it's build performances.

For the unit testing, I chose Jest.

The design is using: SASS, Tailwind and MaterialUI.

The application is automatically deployed on Netlify.

The localStorage is used to store the first fetched data from JSONPlaceholder API, all the CRUD methods still call the API, but the changes are reflected on the localStorage for data persistance.

## Try it online

https://basic-react-crud-pinson-julien.netlify.app/

## Commands

- development server: `npm run dev`
- build : `npm run build`
- preview: `npm run preview`
- Jest tests : `npm run test`
- Jest tests (watch mode) : `npm run test:watch`

## What I would add if I had more time

- Filtering with an input the list of posts
- Allow to change the sorting from ASC to DESC, using a styled radio input.

## What I would improve

### Performances

The application currently suffer from bad performances on the inputs of the post form.

### UI

I would use custom made UI components for a question of branding.
Due to the lack of available time to build clean and scalable components, I used Material UI instead.

Evn through I included SASS and Tailwind to the project, they're barely used at all, because Material UI covered my needs.

### Tests

I would add e2e tests with Cypress