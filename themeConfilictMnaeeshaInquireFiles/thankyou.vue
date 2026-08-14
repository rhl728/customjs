<template>
    <div id="thank-you">
        <v-runtime-template v-if="slotData.template && slotData.template.layouts" :template="slotData.template.layouts.ThankYou"
        />
    </div>
</template>

<script>
export default {
    name: "ThankYou",
    //template: require('../../base_html/layouts/ThankYou.html'),
    props: ['client_id', 'client_logo', 'location_id', 'theme_id'],
    data: function () {
        return {
          
            slotData: {
                language: null,
                settings: null,
                settingLoaded: false,
                helpers: this.$helpers,
                template: "",
            }
        }
    },
    mounted() {
        if (this.location_id) {
            localStorage.setItem("current_location_" + this.client_id, this.location_id);
        }
        this.setLocationData();
        this.$store.state.clientLogo = this.client_logo;
        this.getTemplates();
        this.loadSettings();
        this.loadLanguage();
        
    },
    //  computed: {
    //     hasCheckId() {
    //         return !!localStorage.getItem('checkId');
    //     }
    // }
    // ,
    methods: {
        setLocationData: function () {
            let local_location_id = localStorage.getItem(`current_location_${this.client_id}`)
            this.$store.state.current_locationId = this.location_id || local_location_id;
        },
        getTemplates: function () {
            var that = this;
            document.addEventListener(
                "oms_getTemplateListSuccess",
                function (e) {
                    if (e.detail.result.success) {
                        var templateData = e.detail.result.data;
                        that.slotData.template = templateData
                        that.$store.state.template = templateData;
                        that.slotData.templateAvailable = true;

                    }
                },
                false,
                that
            );

            let getTemplatesEvent = new CustomEvent("oms_getTemplateList", {
                detail: {
                    client_id: this.client_id,
                    theme_id: this.theme_id
                },
            });
            document.dispatchEvent(getTemplatesEvent);
        },

        getTransactionId: function () {
            let url = window.location.search;
            let orderInfo = this.slotData.orderInfo;                        
            let urlParams = new URLSearchParams(url);

            if (urlParams && urlParams.has('txn-reference')) {
                this.slotData.transactionId = urlParams.get('txn-reference');
            }

            if (!orderInfo.order_id) {
                if (urlParams && urlParams.has('transaction-id')) {
                    this.slotData.orderInfo.order_id = urlParams.get('transaction-id');
                }
            }
            window.history.pushState({}, document.title, "/" + "thank-you");

        },
        getOrderDetails: function () {
            let that = this;

            document.addEventListener("oms_getOrderInfoSuccess", function (e) {
                
                let orderInfo = e.detail.result.data;

                if (orderInfo.order_info && orderInfo.order_info.success) {
                    that.updateCart();
                    that.slotData.orderInfo = orderInfo.order_info.data;
                    that.slotData.userEmail = orderInfo.user_info.email;
                    that.slotData.orderForm = orderInfo.order_form;
                    that.slotData.paymentInfo = orderInfo.payment_info;

                    let data = {
                        delivery_info: {},
                        user_info: {},
                        payment_info: {},
                        instruction: {},
                        more_info: {},
                        client_id: that.slotData.client_id
                    };

                    let saveOrderInfoEvent = new CustomEvent("oms_saveOrderInfo", {
                        detail: data,
                    });
                    document.dispatchEvent(saveOrderInfoEvent);
                }

            }, false, that);

            let orderInfoEvent = new CustomEvent("oms_getOrderInfo", {
                "detail": {
                    "client_id": this.client_id,
                    "action": "deleteOrderInfo"
                }
            });
            document.dispatchEvent(orderInfoEvent);
        },
        updateCart: function () {

            document.addEventListener("oms_updateCartSuccess", function (e) {

                let addToCartEvent = new CustomEvent("oms_addToCart");
                document.dispatchEvent(addToCartEvent);

            }, false);

            let updateCartEvent = new CustomEvent("oms_updateCart", {
                "detail": {
                    "client_id": this.client_id,
                    "item": [],
                    "action": 'deleteAll'
                }
            });
            document.dispatchEvent(updateCartEvent);
        },


        checkMyOrder() {
            const checkId = localStorage.getItem('checkId');

            if (checkId) {
                localStorage.removeItem('checkId');
                window.location.href = `/check-order/${checkId}`;

            } else {
                console.warn('Checking ID not found');


                return;

            }
        },

        loadSettings: function () {
            var that = this;


            document.addEventListener("oms_getSettingsSuccess", function (e) {
                if (e.detail.result.success) {
                    let settings = e.detail.result.data;
                    that.slotData.settings = settings;
                    that.$store.state.settings = settings;
                    that.$store.state.client_id = that.client_id;

                    that.loadColors();

                    if (that.slotData.language != null) {
                        that.slotData.settingLoaded = true;
                    }
                }
            }, false, that);


            let getSettingsEvent = new CustomEvent("oms_getSettings", {
                "detail": {
                    "client_id": this.client_id
                }
            });
            document.dispatchEvent(getSettingsEvent);
        },
        loadLanguage: function () {
            var that = this;


            document.addEventListener("oms_getLanguageSuccess", function (e) {                
                if (e.detail.result.success) {
                    let language = e.detail.result.data.data;
                    that.slotData.language = language;
                    that.$store.state.language = language;

                    if (that.slotData.settings != null) {
                        that.slotData.settingLoaded = true;
                    }
                }
            }, false, that);

            let getLanguageEvent = new CustomEvent("oms_getLanguage", {
                "detail": {
                    "client_id": this.client_id
                }
            });
            document.dispatchEvent(getLanguageEvent);
        },
        loadColors: function () {
            let cssVars = this.$store.state.cssVars;
            let settings = this.slotData.settings;

            cssVars['--theme-primary'] = (settings.clr_primary) ? settings.clr_primary : cssVars['--theme-primary'];
            cssVars['--theme-secondary'] = (settings.clr_secondary) ? settings.clr_secondary : cssVars['--theme-secondary'];
            cssVars['--theme-background'] = (settings.clr_background) ? settings.clr_background : cssVars['--theme-background'];
            cssVars['--text-primary'] = (settings.clr_txt_primary) ? settings.clr_txt_primary : cssVars['--text-primary'];
            cssVars['--text-secondary'] = (settings.clr_txt_secondary) ? settings.clr_txt_secondary : cssVars['--text-secondary'];
            this.$store.state.cssVars = cssVars;

            let root = this.$store.state.root;

            root = document.documentElement;
            root.style.setProperty("--theme-primary", cssVars['--theme-primary']);
            root.style.setProperty("--theme-secondary", cssVars['--theme-secondary']);
            root.style.setProperty("--theme-background", cssVars['--theme-background']);
            root.style.setProperty("--text-primary", cssVars['--text-primary']);
            root.style.setProperty("--text-secondary", cssVars['--text-secondary']);

            this.$store.state.root = root;
        }
    }
}

</script>
