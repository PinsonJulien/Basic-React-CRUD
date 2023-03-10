# Basic React CRUD application (WORK IN PROGRESS)

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

Typescript
Build tool : Vite
Unit testing: Jest
End-to-End testing : Cypress
Styling : SASS, Tailwind, MaterialUI

## Try it online

LINK + explanation

## Commands

- development server: `npm run dev`
- build : `npm run build`
- preview: `npm run preview`
- Jest tests : `npm run test`
- Jest tests (watch mode) : `npm run test:watch`

## What I would improve

### UI

I would use custom made UI components for a question of branding.
Due to the lack of available time to build clean and scalable components, I had to use Material UI instead.

## Todo

- The whole UI using the services
- Try to design the application as some sort of blog about nature, biodiversity

- Install Material UI
- Install Cypress and configure it.

- Localstorage :
  - Keeps the id of deleted records.
  - Keeps newly created records and automatically set their id.
  - Keeps updated records and replace them from received API call.

- Delete
  - Localstorage keeps id of deleted records.