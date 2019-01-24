<template>
    <div>
        <b-card title="Card title"
                sub-title="Card subtitle">
            <p class="card-text">
                Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
            </p>
            <a href="#"
            class="card-link">Card link</a>
            <b-link href="#"
                    class="card-link">Another link</b-link>
            <b-alert show>Default Alert</b-alert>
            <b-button variant="primary" @click="addItem()">Add</b-button>
        </b-card>
        <b-card title="Activity"
                sub-title="Type Show">
            <b-table :items="data" :fields="fields">
                <template slot="img_url" slot-scope="{$index, item}">
                    <img :src="item.img_url" height="50"/>
                </template>
            </b-table>
        </b-card>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            fields: [
                { key: 'name', label: '分类名称' },
                { key: 'img_url', label: '图片' },
                { key: 'number', label: '排序'},
            ],
            data: [],
        };
    },
    created() {
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            API.get('type').then((res) => {
                this.data = res;
                console.log(this.data);
            });
        },
        addItem() {
            console.log('aa');
        },
    },
};
</script>
