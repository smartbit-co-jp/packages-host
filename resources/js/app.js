require('./bootstrap');

import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import TinyMceEditor from '@tinymce/tinymce-vue'
// import VueClipboards from 'vue-clipboards';
// Vue.use(VueClipboards);

import VuePrismEditor from "vue-prism-editor";
import "prismjs";
import "prismjs/themes/prism.css";
import "vue-prism-editor/dist/VuePrismEditor.css";


Vue.component( 'basic-editor', TinyMceEditor )
Vue.component( 'code-editor', VuePrismEditor)
Vue.component( 'sb-form', require('./components/SbFormComponent.vue').default )


 const app = new Vue({
     el: '#app',
 });