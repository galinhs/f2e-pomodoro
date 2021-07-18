<template lang="pug">
#app(:class="isShow ? 'light' : 'dark'")
  b-navbar(type='light' variant='transparent')
    b-container.d-flex.justify-content-center.container-fluid
      //- b-row
      b-col(cols='7')
        b-input-group(invalid-feedback='請至少輸入兩個字' :state='state').my-5.position-relative
          b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem' style='width:280px;height:54px')
          b-input-group-append
            b-btn(@click='additem' style='height:54px; width:54px;background:#f44438')
              font-awesome-icon(:icon='["fas","plus"]')
      //- b-col(cols='2' class='p-0 d-flex justify-content-start align-items-center')
      //-   b-btn(variant='danger' @click='additem' style='height:50px; width:50px')
      //-     font-awesome-icon(:icon='["fas","plus"]')
      //- b-col(cols='1' style='right:0;').position-absolute.mx-5
      //-   b-navbar-brand(to='/' variant='transparent')
      //-     font-awesome-icon(:icon='["fas","home"]' style='color:#f44438;font-size:40px')
      b-col(cols='1' style='right:0px;').position-absolute.mx-5
        b-navbar-toggle(target='navbar-collapse')
        b-collapse#navbar-collapse(is-nav)
          b-navbar-nav
            b-nav-item(v-if='isShow' to='/list' @click='toggle')
              font-awesome-icon(:icon='["fas", "bars"]' style='color:#f44438;font-size:65px')
            b-nav-item(v-else to='/' @click='toggle')
              font-awesome-icon(:icon='["fas", "times"]' style='color:#f44438;font-size:65px')
        //- b-btn(to='/list' variant='transparent')
        //-   font-awesome-icon(:icon='["fas", "bars"]' style='color:#f44438;font-size:40px')
      //- b-btn(to='/' variant='success')
      //-   font-awesome-icon(:icon='["fas", "bars"]' style='color:red')
      //- b-navbar-toggle(target='navbar-collapse')
      //- b-collapse#navbar-collapse(is-nav)
      //-   b-navbar-nav.ml-auto
      //-     b-nav-item(to='/list')
      //-       font-awesome-icon(:icon='["fas", "bars"]' style='color:red')
      //-     b-nav-item(to='/settings') 設定
  keep-alive
    router-view
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      newitem: '',
      isShow: true
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
    toggle () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style>
  .dark{
    background-color: #444444;
  }
  .light{
    background-color: #fff;
  }
</style>
