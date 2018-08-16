export default {
    state:{// 存放状态
        info: {
            attentionSort: '',
            investment: '',
            list: [
              {
                'classifyCode': 'BRAND_CATEGORY',
                'tagList': []
              }],
            pageNum: 1,
            pageSize: 10,
            regionTagId: '',
            shopArea: ''
          }
    },
    getters: {// state的计算属性
        
    },
    mutations: { // 更改state中状态的逻辑，同步操作
        updateAdminAssignResult:(state, payload)=>{
             state.code = payload.code;
             state.msg = payload.msg;
        },
        
        updateAdminAssignsearchkey:(state, payload)=>{
              state.assignsearchkey = payload.assignsearchkey;
        },
        updateAdminKorsearchkey:(state, payload)=>{
              state.korsearchkey = payload.korsearchkey;
        },
        updateAdminSalesclerkordersearchkey:(state, payload)=>{
             state.salesclerkordersearchkey  = payload.salesclerkordersearchkey;
        },
        updateAdminSordersearchkey:(state, payload)=>{
             state.sordersearchkey = payload.sordersearchkey;
        },
        
        updateAdminSorderlisttab:(state, payload)=>{
             state.sorderlisttab = payload.sorderlisttab;
        },
        updateAdminSalesclerkorderlisttab:(state, payload)=>{
              state.salesclerkorderlisttab = payload.salesclerkorderlisttab;
        },
        updateAdminKorderlisttab:(state, payload)=>{
              state.korderlisttab = payload.korderlisttab;
        }
    },
    actions: {// 提交mutation，异步操作
       updateAdminAssignResult:({ commit },payload)=>  {
            commit('updateAdminAssignResult', payload)
       },
       
       updateAdminAssignsearchkey:({ commit },payload)=>  {
            commit('updateAdminAssignsearchkey', payload)
       },
       updateAdminKorsearchkey:({ commit },payload)=>  {
            commit('updateAdminKorsearchkey', payload)
       },
       updateAdminSalesclerkordersearchkey:({ commit },payload)=>  {
            commit('updateAdminSalesclerkordersearchkey', payload)
       },
       updateAdminSordersearchkey:({ commit },payload)=>  {
            commit('updateAdminSordersearchkey', payload)
       },
       
       
       updateAdminSorderlisttab:({ commit },payload)=>  {
            commit('updateAdminSorderlisttab', payload)
       },
       updateAdminSalesclerkorderlisttab:({ commit },payload)=>  {
            commit('updateAdminSalesclerkorderlisttab', payload)
       },
       updateAdminKorderlisttab:({ commit },payload)=>  {
            commit('updateAdminKorderlisttab', payload)
       }
    }
}