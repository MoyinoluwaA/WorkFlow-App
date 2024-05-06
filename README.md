# Workflow App

## Introduction
Workflow App is a simple application where on trigger of an action, it creates an outgoing API call. The trigger is a call to an internal endpoint. The UI requires an input URL with a query param to trigger the API Call. API configuration calls are being stored in MongoDb.

Application was built with NextJs, Typescript, TailwindCSS, MongoDb and Next-Auth for Oauth authentication. CI/CD was done using Github actions.

On load of application, user authenticates using either Google or Github credentials. User can then access the application functionality.

## API Documentation
Link - [Workflow App API](https://documenter.getpostman.com/view/15779746/2sA3JGg4En)

## Set Up Development Environment
If you will like to run this application locally, follow these steps:

- Check that nodejs is installed:

```
  node --version
  >> v20.11.1 or greater
```

- Clone the repo and cd into it:

```bash
  git clone https://github.com/MoyinoluwaA/WorkFlow-App
  cd WorkFlow-App
```

- Install dependencies:

```bash
  npm install
```

- Create a `.env` file in the root folder and add  the configuration in the `.env.sample` file to it. Make sure you replace the values with the right values:

```
  GOOGLE_ID = <GOOGLE_ID> Google OAUTH Client Id
  GOOGLE_SECRET = <GOOGLE_SECRET> Google OAUTH Client Secret
  GITHUB_ID = <GITHUB_ID> Github OAUTH Client Id
  GITHUB_SECRET = <GITHUB_SECRET> Github OAUTH Client Secret
  MONGODB_URI = <MONGODB_URI> Use a mongoDb Atlas Url
  NEXTAUTH_URL = <NEXTAUTH_URL> base url of application to be used by next-auth
```

- Run the application with the command:

```
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- Lint the application with the command:

```
  npm run lint
```

- Test the endpoint using Cypress with the command:

```
  npm run test
```


## Deploy Containerized Application To AWS Fargate and ECS

Prerequisites:
- Dockerfile: in the root of the repository
- 
