Members Only project for Odin

https://www.theodinproject.com/lessons/node-path-nodejs-members-only

Use node express, psql, and passport to make a message board app that allows users to post messages that anyone can see, but only members can view the author. When creating a user profile users are asked for a login code. If you have no login code, you can create an account and view messages posted by others. If you have a member-level login code you will be able to post messages and read the authors of other messages. With admin level login code user can delete messages. Login codes are set at the top of database/queries/userQueries.

deployed on Railway:
https://membersonly-production-e019.up.railway.app/


dependencies install: 
npm install express express-session pg passport passport-local pug dotenv