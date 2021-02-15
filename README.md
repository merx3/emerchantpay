# EMerchantPay CRUD assignment

Simple blog implementation with React, Bootstrap 4 and Slim 3, running on docker and npm (separate backend service)

## Install the Application

1. Go to root folder of project and run `composer install`.

2. Go to frontent/ directory and run `npm install`

3. Start up docker containers: `docker-compose up -d`

4. *Run migrations and seeds `vendor/bin/phinx migrate && vendor/bin/phinx seed:run`

6. Go to the backend page (https://127.0.0.1:8443) and allow requests to the insecure ssl server. (Note: you'll see a 404 page when requests are allowed)

5. Startup the frontend by going to frontend/ directory and running `npm start`. The frontend will open in default browser 

*Note: This creates an admin with username: admin, password: qwer1234

To run tests, just run `phpunit` or `./vendor/bin/phpunit`
