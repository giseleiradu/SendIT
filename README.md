![alt text](https://travis-ci.com/giseleiradu/sendIT.svg?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/giseleiradu/sendIT/badge.svg?branch=develop)](https://coveralls.io/github/giseleiradu/sendIT?branch=develop)

# SendIT

## Installation
1. Clone the Project
2. Enter the project directory in CLI
3. Install the dependencies by typping `npm install`

## Run
1. Type `npm run start` in CLI to start the server
2. Type `npm run test` in CLI to test the endpoints
3. Go to browser type `http://localhost:3000 `

Note: the url changes as the routes change. The following is the table of routes and you can change the url according to them.

## User Related Routes
| Method |       Endpoint            |                Action              |
| ------ |  -------------------      | ---------------------------------- |
| GET    | /api/v1/users/            | Fetch all the users in the system  |
| POST   | /api/v1/users/sign-up     | Create a user account              |
| POST   | /api/v1/users/sign-in     | Fetch all the users in the system  |
| GET    | /api/v1/users/:id/parcels | Create the user's parcels          |

## Parcel Related Routes
| Method |       Endpoint             |                Action                 |
| ------ |  -------------------       | ------------------------------------  |
| GET    | /api/v1/parcels/           | Fetch all the parcels in the system   |
| POST   | /api/v1/parcels/id         | display a specific parcel             |
| PUT    |  /api/v1/parcels/id/cancel | changing the parcel status to `cancel`|
| POST   | /api/v1/parcels/           | creates a new parcel                  |





###### *Author: Gisele Iradukunda*
