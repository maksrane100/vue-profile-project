import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
	  profiles:[],
	  total:0
  },
  getters: {

	getData: state => (page, per_page) => {
      
	console.log('in init');
	var skip = page*per_page;
    
	return axios
        .get("http://localhost:3001/profiles/findByPagination?skip="+skip+"&limit="+per_page)
        .then(response => {
          let { data } = response;
		  console.log('response : '+response.data.data);
          this.profiles=response.data;
		  this.total=response.data.length;
		  
		 return {
            profiles: response.data,
            total: response.data.length
          };

        });
    }
	
  }
});
