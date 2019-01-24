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
        </b-card>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
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
    },
};
</script>
