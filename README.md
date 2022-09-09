# nestjs-rest-api

NestJS Rest-Api powered by AWS RDS PostgreSQl

# App Start

1. Create .env file in the root and copy & paste mocked data from .sample-env
2. Edit .env file by writing correct credentials and other connection data
3. Run `yarn start:dev` (`npm run start:dev`) for development or `yarn start` (`npm start`) to up the server
4. Connect to swagger using `http://localhost:3000/docs` url. Provide simple auth typing `secret` in `x-auth-key` input
   <br>![img_2.png](readme-files/swagger-auth-sample.png)