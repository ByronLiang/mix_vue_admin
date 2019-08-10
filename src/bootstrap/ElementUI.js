import Vue from 'vue';
import {
    Loading, MessageBox, Notification, Message, Card, Table, TableColumn, Pagination,
    Input, Button, Form, FormItem, Tooltip, Tag, Select, Option, DatePicker, Autocomplete,
    Radio, Checkbox, CheckboxGroup, Switch, Dialog,
} from 'element-ui';

Vue.use(Loading.directive);
Vue.use(Card);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(DatePicker);
Vue.use(Autocomplete);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Dialog);

Vue.prototype.$ELEMENT = {size: 'mini'};

window.$ele = {
    $loading: Loading.service,
    $msgbox: MessageBox,
    $alert: MessageBox.alert,
    $confirm: MessageBox.confirm,
    $prompt: MessageBox.prompt,
    $notify: Notification,
    $message: Message,
};
