var app = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
    },
    filters: {
        formatCurrency: function(value){
            return '￥' + value.toFixed(2);
        },
    },
    mounted: function(){
        this.cartView();
    },
    methods: {
        cartView: function(){
            this.$http.get('data/cartData.json').then(res => {
                this.productList = res.data.result.list;
                this.totalMoney = res.data.result.totalMoney;
            });
        },
        changeCount: function(product, type){
            if(type > 0){
                product.productQuantity++;
            }else{
                if(product.productQuantity === 1) return;
                product.productQuantity--;
            }
        },
        selectProduct: function(item){
            if(typeof item.checked == 'undefined'){
                // Vue.set(item, 'checked', true);
                this.$set(item, 'checked', true);
            }else{
                item.checked = !item.checked;
            }
        },
        checkAll: function(flag){
            let self = this;
            this.checkAllFlag = flag;

            if(this.checkAllFlag){
                this.productList.forEach(function(item, index){
                    if(typeof item.checked == 'undefined'){
                        self.$set(item, 'checked', true);
                    }else{
                        item.checked = flag;
                    }
                });
            }
        },
    },
});

// 全局过滤器
Vue.filter('money', function(value, type){
    return '￥' + value.toFixed(2) + type;
});
