<template lang="pug">
#list.bg-dark.text-white.w-100.height.p-0.m-0
  b-container
    b-row.d-flex.justify-content-center
      //- b-col(cols='10')
      //-   b-form-group(invalid-feedback='請至少輸入兩個字' :state='state' class='d-flex justify-content-around align-items-center')
      //-     b-form-input(v-model='newitem' :state='state' trim @keydown.enter='additem'  style='height:50px')
      //- b-col(cols='2' class='p-0 d-flex justify-content-start align-items-center')
      //-     b-btn(variant='danger' @click='additem' style='height:50px; width:50px')
      //-       font-awesome-icon(:icon='["fas","plus"]')
      b-col(cols='5').my-5
        h1.p-2 All Tasks
        b-table(:items='list' :fields='listfields').table-borderless.text-white
          template(#cell(name)='data')
            b-form-input(
              v-if='data.item.edit'
              v-model='data.item.model'
              trim
              :state='data.item.state'
              @keydown.enter='changelist(data.index)'
              @keydown.esc='cancellist(data.index)'
            )
            span(v-else) {{ data.value }}
          template(#cell(action)='data')
            span(v-if='!data.item.edit')
              //- 編輯按鈕
              b-btn(@click='editlist(data.index)' variant='transparent').text-white
                font-awesome-icon(:icon='["fas", "pen"]')
              b-btn(@click='dellist(data.index)' variant='transparent').text-white
                font-awesome-icon(:icon='["fas", "trash"]')
            span(v-else)
              b-btn(@click='changelist(data.index)' variant='transparent').text-white
                font-awesome-icon(:icon='["fas", "check"]')
              b-btn(@click='cancellist(data.index)' variant='transparent').text-white
                font-awesome-icon(:icon='["fas", "undo"]')
      b-col(cols='1').d-flex.align-items-center
        .line
      b-col(cols='5').my-5
        h1 Had done
        b-table-simple.table-borderless.text-white
          thead
            tr
              th
              th
          tbody
            tr(v-for='(item, idx) in finished' :key='idx')
              td
                b-btn(@click='delfinish(idx)' variant='transparent').text-white
                  font-awesome-icon(:icon='["fas", "trash"]')
              td {{ item }}
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      newitem: '',
      listfields: [
        { key: 'action', label: '操作' },
        { key: 'name', label: '名稱' }
      ]
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
    },
    finished () {
      return this.$store.state.finished
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
    // 編輯
    editlist (index) {
      this.$store.commit('editList', index)
    },
    // 確認修改
    changelist (index) {
      if (this.list[index].state) {
        this.$store.commit('changeList', index)
      }
    },
    // 取消修改
    cancellist (index) {
      this.$store.commit('cancelList', index)
    },
    // 刪除
    dellist (index) {
      this.$store.commit('delList', index)
    },
    delfinish (index) {
      this.$store.commit('delFinish', index)
    }
  }
}
</script>

<style>
  .line{
    width: 3px;
    height: 60vh;
    background: #707070;
  }
  .height{
    height: calc(100vh - 166px);
  }
</style>
