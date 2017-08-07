var app = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
    },
    filters: {

    },
    mounted: function(){
        this.cartView();
    },
    methods: {
        cartView: function(){
            var self = this;
            this.$http.get('data/cartData.json').then(function(res){
                self.productList = res.data.result.list;
                self.totalMoney = res.data.result.totalMoney;
            });
        },
    },
});
