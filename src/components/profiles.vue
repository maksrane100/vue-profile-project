<template>
	<div id="product-list-two">
	
		<h2 class="title">Profiles</h2>
		
		<h4 class="message">Total Profiles Found:{{total}}</h4>
  
		<div id="example"  class="pagination">
			<span class="pagesize">Current Page: {{this.page}} 	Current Page Size : {{this.per_page}}</span>
			<button class="button" v-on:click="handleIncreaseSizeClick">INCREASE PAGE SIZE</button>
			<button class="button" v-on:click="handleFirstClick">FIRST</button>
			<button class="button" v-on:click="handlePrevClick">PREV</button>
			<button class="button" v-on:click="handleNextClick">NEXT</button>
			<button class="button" v-on:click="handleLastClick">LAST</button>
		</div>
		
		<div>
			<div class="main_row" v-for="profile in profiles">

			<div class="row">
				<span class="text_field">About Myself : </span><span class="text">{{ profile.about_details.about_myself }}</span>
			</div>

			<div class="row">
				<span class="text_field">Age : </span><span class="text">{{ profile.about_details.age }} {{ profile.about_details.gender }}</span>
			</div>

			<div class="row">
				<span class="text_field">Education : </span><span class="text">{{  profile.about_details.undergraduate_degree }}</span>
			</div>

			<div class="row">
				<span class="text_field">Religion : </span><span class="text">{{  profile.religion_details.religion }}</span>
			</div>

			<div class="row">
				<span class="text_field">Caste : </span><span class="text">{{  profile.religion_details.caste }} {{  profile.religion_details.sub_caste }}</span>
			</div>


			<div class="row">
				<button class="button" v-on:click="show($event, profile)">View Details</button>
			</div>
	   
		</div>
	</div>
  

		<div id="example"  class="pagination">
			<span class="pagesize">Current Page: {{this.page}} 	Current Page Size : {{this.per_page}}</span>
			<button class="button" v-on:click="handleIncreaseSizeClick">INCREASE PAGE SIZE</button>
			<button class="button" v-on:click="handleFirstClick">FIRST</button>
			<button class="button" v-on:click="handlePrevClick">PREV</button>
			<button class="button" v-on:click="handleNextClick">NEXT</button>
			<button class="button" v-on:click="handleLastClick">LAST</button>
		</div>

		<modal name="profile_details_modal">
			<div>
					
				<div class="modal_row_highlight">
					<span class="name"  v-if="selectedProfile.user_id!=null">User : {{ selectedProfile.user_id.firstname }} {{ selectedProfile.user_id.lastname }}</span>
					<button class="close_button" v-on:click="hide($event, selectedProfile)">X</button>
				</div>
				
				<div class="modal_row">
					<span class="modal_field">Undergraduate Education</span><span class="modal_text" v-if="selectedProfile.about_details!=null">{{ selectedProfile.about_details.undergraduate_degree }} - {{ selectedProfile.about_details.undergraduate_institute_details }}</span>
				</div>
				
				<div class="modal_row">
					<span class="modal_field">Graduate Education</span><span class="modal_text" v-if="selectedProfile.about_details!=null">{{ selectedProfile.about_details.graduate_degree }} - {{ selectedProfile.about_details.graduate_institute_details }}</span>
				</div>
				
				<div class="modal_row">
					<span class="modal_field">Employment</span><span class="modal_text" v-if="selectedProfile.about_details!=null">{{ selectedProfile.about_details.employment }}</span>
				</div>
				
				<div class="modal_row">
					<span class="modal_field">Work Location</span><span class="modal_text" v-if="selectedProfile.about_details!=null">{{ selectedProfile.about_details.work_location_city }} {{ selectedProfile.about_details.work_location_country }}</span>
			   </div>
			   
				<div class="modal_row">
					<span class="modal_field">Contact</span><span class="modal_text" v-if="selectedProfile.contact_details!=null">{{ selectedProfile.contact_details.primary_email }} {{ selectedProfile.contact_details.phone_no  }}</span>
			   </div>

				<div class="modal_row">
					<span class="modal_field">Address</span><span class="modal_text" v-if="selectedProfile.address_details!=null">
					{{ selectedProfile.address_details.address1 }} {{ selectedProfile.address_details.address2 }}
					{{ selectedProfile.address_details.city }} {{ selectedProfile.address_details.state }}
					{{ selectedProfile.address_details.zip }} {{ selectedProfile.address_details.country }}
					</span>
			   </div>
			   
			   <div class="modal_row">
					<button class="close_button" v-on:click="hide($event, selectedProfile)">Close</button>
			   </div>
				   
			</div>
		</modal>

	</div>
</template>


<script>
	import { store } from "../store/store.js";
	import axios from "axios";
	import VModal from 'vue-js-modal'


export default {

	data() {
		return {
			profiles: [],
			selectedProfile: {},
			total:0,
			page:1,
			per_page:5

		};
	},


	created: function() {
		this.init(1,this.per_page);
    },


	methods: {

	init(page, per_page){
		
		console.log('in init');
		
		if(page>0) {
			page=page-1;
		}
		var skip = page*per_page;
		const url="http://localhost:3001/profiles/findByPagination?skip="+skip+"&limit="+per_page;
		console.log('url : '+url);
		
		const urlTotal="http://localhost:3001/profiles/";
		console.log('url : '+url);
		
		axios
		.get(urlTotal)
		.then(response => {
			this.total=response.data.length;
		});
			
		return axios
		.get(url)
		.then(response => {
			let { data } = response;
			console.log('response : '+response.data);
			this.profiles=response.data;

			return {
				profiles: response.data
			};

		});
	},

	handleFirstClick(){
		this.page=1;
		this.init(this.page, this.per_page);
	},
	
	handlePrevClick(){
		if(this.page>1) {
			this.page=this.page-1;
			this.init(this.page, this.per_page);
		}
	},

	handleNextClick(){
		this.page=this.page+1;
		this.init(this.page, this.per_page);
	},
	
	handleLastClick(){
		this.page=Math.ceil(this.total/this.per_page);
		this.init(this.page, this.per_page);
	},

	handleIncreaseSizeClick(){
		this.per_page=this.per_page+1;
		this.init(this.page, this.per_page);
	},
	
	show (event, selectedProfile) {
		this.selectedProfile=selectedProfile;
		this.$modal.show('profile_details_modal');
	},
	
	hide (event, selectedProfile) {
		this.selectedProfile=null;
		this.$modal.hide('profile_details_modal');
	}

},


	computed: {
	
	profiles() {
      return this.$store.state.profiles;
    },
	
	getprofiles() {
      return this.$store.getters.getData;
    }
	
  }
  
};
</script>


<style scoped>

.title {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 24px; 
	font-weight: normal;
	color: #0B4C5F;
	display: block;
	margin: 12px;
	padding: 10px;
}

.message {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 20px; 
	font-weight: normal;
	color: #0B4C5F;
	display: block;
	margin: 12px;
	padding: 10px;
}

.pagesize {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	font-weight: normal;
	color: #0B4C5F;
	display: block;
	margin: 12px;
	padding: 10px;
}

.modal_row_highlight {
	color: #FFFFFF;
	background: #000000;
	height: 25px;
}

.text_field {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	width: 180px;
	float: left;
	font-weight: bold;
	color: #0489B1;
		margin: 4px;
	padding: 4px;
}

.text {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	float: left;
	font-weight: normal;
	color: #0489B1;
		margin: 4px;
	padding: 4px;	
}

.modal_field {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	width: 200px;
	float: left;
	font-weight: bold;
	color: #0489B1;
		margin: 4px;
	padding: 4px;
}

.modal_text {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	font-weight: normal;
	color: #0489B1;
	display: block;
	margin: 4px;
	padding: 4px;
}

.image {
	width: 50px;
	height: 50px;
}

.pagination {
	clear: both;
}

.button {
	background-color: #D7DF01;
	border: none;
	color: white;
	padding: 4px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 12px;
	cursor: pointer; 
}

.close_button {
	background-color: #D7DF01;
	border: none;
	color: white;
	height: 25px;
	padding: 4px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 14px;
	cursor: pointer; 
	float: right;
}

.main_row {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	background-color: #E1F4FF;
	border: 1px solid #0083FF;
	clear: both;
	width: 70%;
	float:left;
	padding: 20px;
	margin: 20px;
}

.modal {
	//background-color: #E1F4FF;
	height: 100%
}

.row {
    font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; 
	font-size: 18px; 
	border: none;
	color: white;
	text-align: center;
	text-decoration: none;
	font-size: 12px;
	cursor: pointer; 
	clear: both;
}

.modal_row {
	clear: both;
}
</style>
