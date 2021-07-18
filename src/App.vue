<template lang="pug">
#app(:class='{ dark:isDark,light:!isDark }')
  //- b-navbar(toggable='lg' type='light' variant='transparent')
  b-container.d-flex.justify-content-center.container-fluid.w-100
    //- b-row
    b-col(cols='1').my-5.p-0
      b-navbar-brand(to='/').text-decoration-none 番茄鐘
    b-col(cols='6')
      b-form-group(invalid-feedback='請至少輸入兩個字' :state='state' class='d-flex justify-content-around align-items-center my-5')
        b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' size='lg')
          b-input-group-append
            b-button(variant="outline-success") Button
    b-col(cols='2' class='p-0 d-flex justify-content-start align-items-center')
      b-btn(variant='danger' @click='additem' style='height:50px; width:50px')
        font-awesome-icon(:icon='["fas","plus"]')
    b-col(cols='1').my-5
      b-btn(to='/list' variant='transparent' @click='isDark=!isDark')
        font-awesome-icon(:icon='["fas", "bars"]' style='color:red')
      //- b-btn(to='/' variant='success')
      //-   font-awesome-icon(:icon='["fas", "bars"]' style='color:red')
      //- b-navbar-toggle(target='navbar-collapse')
      //- b-collapse#navbar-collapse(is-nav)
      //-   b-navbar-nav.ml-auto
      //-     b-nav-item(to='/list')
      //-       font-awesome-icon(:icon='["fas", "bars"]' style='color:red')
      //-     b-nav-item(to='/settings') 設定
          //- 影片07:31
  keep-alive
    router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      newitem: '',
      isDark: false
    }
  },
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    list () {
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    }
  },
  methods: {
    additem () {
      if (this.state) {
        this.$store.commit('addList', this.newitem)
        this.newitem = ''
      } else {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '必須要兩個字以上'
        })
      }
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .dark{
    background-color: #343a40;
  }
  .light{
    background-color: #fff;
  }
</style>
