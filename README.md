# Spring Boot Web Server for Chatting
###This server is using FreeMarker for server-side rendering, MongoDB for storage, and is hosted on Heroku.

## Hosting locally
application.properties sets current profile to "prod" unless it is overruled in the run configuration.
You will need an application-<profile-name>.properties file for db connection. 

For example: Name file application-dev.properties and set active profiles in the run config to "dev".

## Hosting on Heroku
Set a config variable: Key should be DATABASE_LINK and the value to connection link from MongoDB.
That's all.