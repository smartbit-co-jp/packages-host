export default {

    state: {
        workingConditions: [],
        kobetsu:{
            haken_fee: {},
            unit: {},
            work_content: {
                name: {}
            },
            work_place: {}
        },
        currentKobetsuId:null,
        errors:{},
        roudouContractDate:null,
        contractPeriod: null,
        notViewedCurriculumsCount: 0,
        curriculums: []
    },

    getters: {
        // example
        // getFiltered(state) {
        //     //
        // }
    },

    actions: {
        getCurriculums(context) {
            axios
                .get(`/curriculum`)
                .then((response) => {
                    context.state.curriculums = response.data.curriculums
                })
                .catch((response) => {
                    console.log("error", response)
                })
        },
        getNotViewedCurriculumsCount(context){
            axios
                .get("/curriculum")
                .then((response) => {
                    context.state.notViewedCurriculumsCount = response.data.curriculums.filter((cv) => cv.viewed == 0).length
                })
                .catch((response) => {
                    console.log("error", response)
                })
        },
        markCurriculumsAsViewed({dispatch}){
            axios.get('/curriculum/mark_as_viewed').then((response) => {
                dispatch('getNotViewedCurriculumsCount')
            }).catch((error) => {
                console.log(error.response)
            })
        },
        loadData(context) {
            let only = [
                'id', 
                'haken_fee', 
                'unit', 
                'work_content', 
                'work_place', 
                'child_id',
                'used_slots_count',
                'no_of_person',
                'number',
                'contract_date',
                'start',
                'end',
                'haken_fee_formated',
                'status',
                'has_child',
                'child_id',
                'parent_id'
        ];
            axios.get(`/kobetsu/${context.state.currentKobetsuId}/to_json?only=${only}`).then((response) => {
                context.commit("LOAD_KOBETSU", response.data.kobetsu)
            })

            let wcsOnly = [
                'id',
                'number',
                'start',
                'end',
                'status',
                'contract_date',
                'branch',
                'haken',
                'has_child',
                'child_id',
                'parent_id',
                'unit',
                'work_content',
                'roudou',
                'previous',
                'person',
                'all_related',
                'terminated_at',
                'is_inactive',
                'position',
                'kobetsu_id',
                'child'
            ]
            // O _vm é necessário por estar dentro do vuex.
            this._vm.request('get', `/kobetsu/${context.state.currentKobetsuId}/get_working_conditions?only=${wcsOnly}`, {}, {
                onSuccess: (response) => {
                    context.commit("LOAD_WORKING_CONDITIONS", response.working_conditions)
                }
            })
        }
    },

    mutations: {
        SET_CURRENT_KOBETSU_ID(state, kobetsuId) {
            state.currentKobetsuId = kobetsuId
        },
        SET_CONTRACT_PERIOD(state, value) {
            state.contractPeriod = value
        },
        SET_ROUDOU_CONTRACT_DATE(state, contractDate) {
            state.roudouContractDate = contractDate
        },
        LOAD_KOBETSU(state, kobetsu) {
            state.kobetsu = kobetsu
        },
        LOAD_WORKING_CONDITIONS(state, working_conditions) {
            state.workingConditions = working_conditions
        },
        SET_ERRORS(state, data) {
            state.errors = data
        },
    }
}