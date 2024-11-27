# A Board - Frontend

This is the frontend for the "A Board" application, a blogging platform where users can create, edit, and view posts.

## Features
User authentication and session handling
Post listing, creation, editing, and deletion
Responsive design supporting mobile, tablet, and desktop views
Error handling with global error modals

# How to start a project:

### Start A Board - backend
You can get a repository here: https://github.com/pongsirichatkaew/aboard-backend

### Set Up Environment Variables
Create a .env file in the root directory and configure the following variables:

```
NEXT_PUBLIC_API_URL=<backend-api-url>
```
For example if you use my backend it would be 
http://localhost:3000

### Prerequisites
- Node.js (>=18.x.x)
- Docker and Docker Compose for running dependencies 

```
npm install
```

The application can be started in development mode by running:

```
docker-compose up --build
```
or
```
npm run dev
```

Once running, the application should restart when changes to the **JavaScript** are detected.
