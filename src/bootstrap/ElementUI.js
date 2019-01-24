import Vue from 'vue';
import {
    Button, Card, Loading, Message, MessageBox, Tooltip,
} from 'element-ui';

Vue.use(Loading.directive);
Vue.use(Tooltip);
Vue.use(Card);
Vue.use(Button);

Vue.prototype.$ELEMENT = {size: 'small'};

window.$ele = {
    $loading: Loading.service,
    $msgbox: MessageBox,
    $alert: MessageBox.alert,
    $confirm: MessageBox.confirm,
    $prompt: MessageBox.prompt,
    $message: Message,
};
