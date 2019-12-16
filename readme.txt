**********************************************************************************
************* Reading Profile From API And Display Using Vue *********************
**********************************************************************************
**********************************************************************************

This project demonstrates how to read API data of user profiles and display it using Vue.

Before you run this project, please download and run project from another repository named as "profile-rest-api".

This will start the API of user profiles that we will be consuming in this project.

Download the project in C: and then run  the following command

Install the dependencies in the local node_modules folder. 

c:\vue-profile-project>npm install

To run the project, run following command

c:\vue-profile-project>npm run dev

> cross-env NODE_ENV=development webpack-dev-server --open --hot

Project is running at http://localhost:8080/
webpack output is served from /dist/
404s will fallback to /index.html

When you go to the link http://localhost:8080/ in browser, you will see the profiles
(screenshots attached.)

You can take a  look at profiles.vue in components that is called by App.vue. profiles.vue is responsible
for fetching profiles using API and display pagination. User can increase the page size (which is number 
of records displayed on a page), go to first, previous, next, last page by clicking pagination links.
(screenshots attached.)