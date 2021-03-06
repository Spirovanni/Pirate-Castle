/* after changing this file run 'yarn run webpack:build' */
/* tslint:disable */
import '../content/scss/vendor.scss';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// jhipster-needle-add-element-to-vendor - JHipster will add new menu items here
import "tinymce/tinymce.min.js";
import "tinymce/themes/modern/theme.min.js";
import "tinymce/plugins/link/plugin.min.js";
import "tinymce/plugins/paste/plugin.min.js";
import "tinymce/plugins/table/plugin.min.js";
import "chart.js/dist/Chart.min.js";
import "./ngx-admin/assets/vendors/echarts.world.min.js";
