import "@babel/polyfill";
import Vue from 'vue';
import vuetify from './plugins/vuetify'
import _ from 'lodash'
import vueNumeralFilterInstaller from 'vue-numeral-filter';

import IndexPage from './vue/pages/index.vue';

import SchoolPage from './vue/pages/school.vue';
import SchoolProgramsPage from './vue/pages/school_fields.vue';
import TransitionPage from './vue/pages/school_transition.vue';

import SearchPage from './vue/pages/search.vue';

import DataIndexPage from './vue/pages/data.vue';
import DataChangelogPage from './vue/pages/data_changelog.vue';
import DataDocumentationPage from './vue/pages/data_documentation.vue';
import DataGlossaryPage from './vue/pages/data_glossary.vue';

import ComparePage from './vue/pages/compare.vue';

import FourOhFour from './vue/pages/404.vue';

import './vue/filters.js'
import './vue/mixins.js'
import './plugins/chartjs.js';

Vue.prototype._ = _
Vue.use(vueNumeralFilterInstaller, { locale: 'en' });

import style from '../../sass/style.scss';

// Global Method for Tracking Events
// If analytics is not enabled, console receives the input. 
Vue.mixin({
  methods: {
    GATrackEvent(category, action, label) {
      if(window.ga)
      {
        try{
          ga('send','event',category,action,label);
        }
        catch(e){
          console.error('[ga] event error');
        }
      }
      else{
        console.log('GA Event: ['+category+','+action+', '+label+']');
      }
    }
  }
});


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
    'index-page': IndexPage,
    'school-page': SchoolPage,
    'school-programs-page': SchoolProgramsPage,
    'transition-page': TransitionPage,
    'search-page': SearchPage,
    'data-index-page': DataIndexPage,
    'data-changelog': DataChangelogPage,
    'data-documentation': DataDocumentationPage,
    'data-glossary': DataGlossaryPage,
    'compare-page': ComparePage,
    'four-oh-four': FourOhFour
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

  },
  methods:{
    refreshResults(resultsObject){
      this.results = resultsObject;
    },
    // Refresh Compare Schools from Local Storage.
    refreshCompareSchools(){
      this.compareSchools = picc.school.selection.all(picc.school.selection.LSKey);
    },
    // Toggle Compare School in local storage.
    toggleCompareSchool(school){
      // Prepare Data, Make a call to the picc function.    
      let schoolData = {
        dataset:{
          bind:"selected_school",
          school:"compare-schools",
          schoolId: (school.schoolId) ? String(school.schoolId) : String(school.id),
          schoolName: (school.schoolName) ? school.schoolName : school['school.name'],
        }
      };

      picc.school.selection.vueToggle(schoolData);
      this.refreshCompareSchools();
    }
  }
});