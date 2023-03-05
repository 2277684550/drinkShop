// home模块的小仓库
import { reqDataList } from "@/api"
// state:仓库储存数据的地方
const state = {
    //state 中的默认初始值别瞎写，服务器返回什么，默认值就为什么
    DataList:[]
}
// mutations:修改state的唯一手段,只有mutations可以修改state的数据
const mutations = {
    DATALIST(state,DataList){
        state.DataList = DataList
    }
}
// actions:处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    // 这里可以书写业务逻辑,但是不能修改直接修改state,要提交mutations,让mutations提交
    async DataList({commit}){
        let result = await reqDataList()
        commit('DATALIST',result.data)
        console.log(result.data);
    }
}
// getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {}

// 对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}