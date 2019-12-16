# vuex-product-list

This is a project to help me learn how to use Vue.js's state manager library Vuex with the help of this [tutorial](https://www.youtube.com/watch?v=BGAu__J4xoc&list=PL4cUxeGkcC9i371QO_Rtkl26MwtiJ30P2) from Net Ninja.

This quick web app just shows two product lists, and has a button that imitates a (very slow) server that changes the data.

![screen shot 2018-03-01 at 17 47 31](https://user-images.githubusercontent.com/14803518/36860279-bcc75c4a-1d78-11e8-8a45-42db6580eea7.png)

### Installation

```
git clone git@github.com:puyanwei/vuex-product-list.git
cd vue-product-list
npm install
npm run dev
```

This should open a browser and open the page at http://localhost:8080/

### State Management

This tutorial showed me why using Vuex could better especially when handling a lot of data.

Without using Vuex it means that there is a lot of back and forth data handling between a parent component and its children. This is especially longwinded if one child component wants to pass data to another.

![screen shot 2018-03-01 at 17 54 46](https://user-images.githubusercontent.com/14803518/36860614-b28fadee-1d79-11e8-8a45-cb55f6a1299b.png)

Importing a state controller using Vuex means that the data can be used anywhere. It also has the benefit of being able to be edited in its own file, which would effect everything that is referring to it, meaning you wouldn't have to change each separate page.
