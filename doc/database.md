## Database management

Initially the platform will run with an instance of SQLite. It will take care of the setup and initialization process. You can view the database scheme [here](../backend/prisma/schema.prisma).

### Changing the DB type

You can change the Database type to any of [Prisma's supported database types](https://www.prisma.io/docs/) by changing the datascource in the [Prisma Scheme file](../backend/prisma). 

### Resetting

Reset DB by running `npm run resetDB` inside the [backend](../backend/) directory on a command shell.
