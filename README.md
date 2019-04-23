# microCMDB

This is a micro configuration manager for managing assets in our monitoring system. Basically, a CRUD app that commits changes of new and existing assets to the monitoring system repository.

### Stack
  - VueJS (client-side)
  - ExpressJS (middleware, API endpoints, authentication, etc.)
  - NodeJS (Runtime)
  - MongoDB (NoSQL database)

### Prerequisites

Prior to installation and deployment, make sure to have the following environment variables set to values compatible with your systems. Put these variable in a file named '.env' in the root folder. The app reads these variables from 'process.env' so if you have a better way to achieve this, go for it.

PORT=xxxx  
DB_USERNAME=xxxx  
DB_PASSWORD=xxxx  
DB_URL=xxxx  
SECRET=xxxx  
SALT=xxxx  

### Installation

[Node.js](https://nodejs.org/) v10+ is recommended.

Clone the repo into your desired folder, then install dependencies and start the server. For production level use, please use proprietary certificates (if locally hosted), and make sure to implement load balancing if this is going to be heavily used.

```sh
$ git clone https://github.com/fhassan0592/micro-cmdb.git .
$ npm install
$ node app.js
```
To successfully integrate, the monitoring system will have to be set up with a git workflow, where it will periodically read diffs from a central repository, which this app will write to.

### For end users

Just login, or signup for an account. Make sure to add hosts that are reachable (with valid IPs, of course) via the network, because the monitoring system will send out false alerts if it is not able to reach the added host.

