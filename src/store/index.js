import { createStore } from 'vuex'
import router from '../router/index'
export default createStore({
  state: {
    tareas : [],
    tarea: {
      id:  "",
      nombre: "",
      categorias: [],
      estado: '',
      numero: 0
    },
  },
  mutations: {

cargar(state, payload){
  state.tareas = payload
}

    ,set(state, payload){
      console.log(payload)
      state.tareas.push(payload)
      console.log(state.tareas)
      localStorage.setItem("tareas", JSON.stringify(state.tareas))

    },
    delete(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
      localStorage.setItem("tareas", JSON.stringify(state.tareas))

      alert('Registro eliminado')
    },
    findTarea(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        alert('ID no encontrado')
       router.push('/')
       return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload)
    {

      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      localStorage.setItem("tareas", JSON.stringify(state.tareas))

      alert('Registro Editado')
      router.push('/')
    }
  },
  actions: {

    cargarLocalStorage({commit}){
      if (localStorage.getItem("tareas")){
        const tareas = JSON.parse(localStorage.getItem("tareas"))
        commit('cargar', tareas)
      } else {
        localStorage.setItem("tareas", JSON.stringify([]))
      }

    },
    setTareas({commit}, tarea){
      commit('set', tarea)
      
    },
    deleteTarea({commit}, id){
      commit('delete', id)
    },
    getTarea({commit}, id){
      commit('findTarea', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})
