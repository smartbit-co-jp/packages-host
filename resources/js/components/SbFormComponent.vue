<template>
    <div class="form">
        <b-modal
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        
         v-if="id!=null" :title="title" v-model="modalOpen" :id="'sb-form-modal-'+id" :hide-footer="noButton">
            <slot name="modal" v-bind:form="form"></slot>
            <template v-slot:modal-footer>
                <b-button :variant="headerBgVariant ? headerBgVariant :'success'" @click="send()">
                    {{ sbLang.global.save }}
                </b-button>
            </template>
        </b-modal>
        <div>
            <b-alert 
                class="position-fixed fixed-bottom m-0 rounded-0 text-center"
                :show="loading"
            >
                <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                {{ sbLang.global.loading }}...
            </b-alert>
            <b-alert
                :show="countDown"
                class="position-fixed fixed-bottom m-0 rounded-0 text-center"
                dismissible
                fade
                :variant="sbAlertVariant"
                @dismiss-count-down="countDownChanged"
            >
                {{ sbAlertMessage }}
            </b-alert>
            <slot name="body" v-bind:form="form"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            fields:{type: Object},
            method:{
                default: 'post',
                type: String,
            },
            noButton:{
                default: false,
                type: Boolean,
            },
            title:{
                default: null,
                type: String,
            },
            section:{
                default: null,
                type: String,
            },
            id:{
                default: null,
                type: String,
            },
            action:{
                type: String,
            },
            resetForm:{
                default: true,
                type: Boolean,
            },
            watchChanges:{
                default: false,
                type: Boolean
            },
            headerTextVariant:{
                type: String,
            },
            headerBgVariant:{
                type: String,
            },
            reloadPage:{
                default: false,
                type: Boolean
            },
            shouldOpenModal:{
                default: false,
                type: Boolean
            },
            value:{
                type: Object
            },
            shouldResetChangesCountOnIdChange:{
                default: false,
                type: Boolean
            }
        },
        data: function() {
            return {
                countDown: 0,
                loading: false,
                modalOpen: false,
                sbAlertVariant: 'success',
                sbAlertMessage: '',
                form: {},
                changesCount: 0
            }
        },
        watch: {
            form: {
                handler: function(newValue, oldValue) {
                    if(this.shouldResetChangesCountOnIdChange){
                        if(newValue.id != oldValue.id && oldValue.id != null){
                            this.changesCount = 0
                        }else{
                            this.changesCount++ 
                        }
                    }else{
                        this.changesCount++ 
                    }
                    this.form.changesCount = this.changesCount
                },
                deep: true
            },
            value: function(){
                this.form = this.value
            }
        },
        created() {
            if(this.watchChanges)
            window.onbeforeunload = () => this.hasChanges()
        },
        mounted() {
            this.form.send = (sender) => { return this.send(sender) }
            this.form.updatePhone = (phone) => { return this.updatePhone(phone) }
            this.modalOpen = this.shouldOpenModal
        }, 
        beforeMount(){
            if(this.value){
                this.form = this.value
            }else{
                this.form = this.fields
            }
        },
        methods: {
            updatePhone(phone)
            {
                this.form.phone = phone
            },
            hasChanges() {
                if(this.changesCount > 1) {
                    return 'unsaved changes';
                }
            },
            send(sender) {
                this.$store.commit('SET_ERRORS', {})
                this.countDown = 0
                this.loading = true
                switch (this.method) {
                    case 'post':
                        window.axios.post(
                            this.action, {'form_data':this.form,'section':this.section}
                        ).then((response)=>{
                            this.modalOpen = false
                            if(this.reloadPage){
                                location.reload();
                            }else{
                                this.alert(response.data.message)
                                this.form = response.data.model
                                this.form.send = (sender) => { return this.send(sender) }
                                this.form.updatePhone = (phone) => { return this.updatePhone(phone) }
                                this.onSave()
                            }
                        }).catch((error)=>{
                            if(error.response.data.errors){
                                this.$store.commit('SET_ERRORS', error.response.data.errors)
                            }
                            this.alert(error.response.data.message,'danger',sender)
                        }).finally(()=>{
                            this.finalize()
                        })
                        break;
                    case 'put':
                        window.axios.put(
                            this.action, {'form_data':this.form,'section':this.section}
                        ).then((response)=>{
                            this.modalOpen = false
                            this.alert(response.data.message)
                            this.form = response.data.model
                            this.form.send = (sender) => { return this.send(sender) }
                            this.form.updatePhone = (phone) => { return this.updatePhone(phone) }
                            this.onSave()
                        }).catch((error)=>{
                            if(error.response.data.errors){
                                this.$store.commit('SET_ERRORS', error.response.data.errors)
                            }
                            this.alert(error.response.data.message,'danger',sender)
                        }).finally(()=>{
                            this.finalize()
                        })
                        break;
                
                    default:
                        break;
                }
            },
            finalize() {
                this.loading = false
                this.changesCount = 0
                this.form.changesCount = this.changesCount
            },
            onSave(){
                this.$emit('save', Object.assign({}, this.form))
                this.$emit('input', this.form)
                this.changesCount = 1
                if(this.resetForm) {
                    this.form = this.fields
                }
                console.log(this.fields, 'fields')
            },
            alert(message, variant='success') {
                this.sbAlertVariant = variant
                this.sbAlertMessage = message
                this.countDown = 5
            },
            countDownChanged(countDown) {
                this.countDown = countDown
            }
        }
    }
</script>