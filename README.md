# Workflow App

## Introduction
Workflow App is a simple application where on trigger of an action, it creates an outgoing API call. The trigger is a call to an internal endpoint. The UI requires an input URL with a query param to trigger the API Call. API configuration calls and results are stored in MongoDb.

On load of application, user authenticates using either Google or Github credentials. User can then access the application functionality.

### Tech Stack
- NextJs, Typescript, TailwindCSS, MongoDb and Mongoose.
- Joi for API Input validation.
- Next-Auth for Oauth authentication. 
- Github actions for CI/CD. 
- Docker, AWS ECR and AWS ECS with Fargate for deploying containerized application.
- Cypress for E2E Testing.

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

Read this [article](https://medium.com/@vi.nhon.53th/next-js-v13-demo-login-with-github-and-google-31cd56e547de) to learn how to configure Google and Github, and get the `GOOGLE_ID`, `GOOGLE_SECRET`, `GITHUB_ID` and `GITHUB_SECRET` values.

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
- env: Environment variables required by the application

### STEPS FOR DEPLOYMENT

1. Create an Amazon ECR repository to store your images via the AWS console or cli.

Using cli:
```
  aws ecr create-repository \
    --repository-name MY_ECR_REPOSITORY \
    --region MY_AWS_REGION
```

2.  Create an Amazon ECS task definition, cluster, and service. Follow the steps [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-fargate.html). Add an Application Load balancer to the ECS Service to get the deployed application url as the task definition public ip changes with each deployment.

3.  Store the Amazon ECS task definition as a JSON file in the GitHub repository or use the one present in .aws/task-definition.json. Set the `ECS_TASK_DEFINITION` variable in Github Actions to the path of the JSON file.

4. Create GitHub Actions secrets named `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to store the values for your Amazon IAM access key.

5. Create variables on Github Actions to store the AWS `ECR_REPOSITORY`, `ECS_CLUSTER`, `ECS_SERVICE` and `CONTAINER_NAME` as these values will be referenced in the github workflow. 

6.  Add application environment variables to Github Actions as variables or secret. Github does not permit adding env to actions with a github prefix, so you can update the env name from `GITHUB_ID` and `GITHUB_SECRET` to `OAUTH_GITHUB_ID` and `OAUTH_GITHUB_SECRET` or any name of your choice.

7. Create a `.github/deployment.yml` file and add jobs or use the one in repository. The jobs included are:
-  **Lint:** to ensure the application is linted and passes all checks.
- **Test:** run e2e test with Cypress to ensure functionality works as expected.
- **Scan:** scan code to ensure no vulnerabilities have been introduced.
- **Deploy:** When lint, test and scan passes, the deploy job is run. It consists of various steps namely:
	- Configuring AWS credentials so the job can access push to ECR and deploy to ECS.
	- Login to Amazon ECR.
	- Build docker image with environment variables and push to specified ECR Repository.
	- Update the task definition file with the newly pushed docker image id.
	- Deploy the task definition to ECS using specified ECS Cluster and Service.

8. View the deployed application using the Load balancer url.

**Note:** 
- After Deployment, update the Authorized JavaScript origins and Authorized redirect URIs to include the deployed url (load balancer url) in the project OAuth 2.0 Client IDs configuration (Google and Github).
