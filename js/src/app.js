import Vue from 'vue';
import SearchPage from './SearchPage.vue';

import vuetify from './plugins/vuetify';

import _ from 'lodash';

import style from '../../sass/style.scss';

new Vue({
  vuetify,
  el: '#app',
  data:{
    results:{},
    site:{
      data:{
        all: null,
        states: null,
        programs: null,
        religiousAffiliations:null,
        specializedMission:null,
      }
    },
    isLoading: true,
    compareSchools:null
  },
  components:{
    'search-page': SearchPage
  },
  created(){
    this.refreshCompareSchools();
  },
  mounted(){
    let vm = this;
    // Process the search updated event.
    document.addEventListener('search-updated', function (e) {
      console.log("Event Heard From Vue.");
      vm.refreshResults(e.detail.data);
    });

    // Items passed via page variable.
    // TODO - Do we need any more data?
    this.site.data.all = siteDataAll;
    this.site.data.states = this.site.data.all.states;
    this.site.data.programs = this.site.data.all.programs;
    this.site.data.religiousAffiliations = this.site.data.all.religious_affiliations;
    this.site.data.specializedMission = this.site.data.all.special_designations;
  },
  methods:{
    refreshResults(resultsObject){
      this.results = resultsObject;
    },
    // Refresh Compare Schools from Local Storage.
    refreshCompareSchools(){
      this.compareSchools = picc.school.selection.all(picc.school.selection.LSKey);
    }
  }
});