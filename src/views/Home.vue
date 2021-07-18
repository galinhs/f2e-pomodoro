<template lang="pug">
#home
  b-container.mt-5
    b-row(class='h-50 d-flex justify-content-center align-items-center flex-column')
      b-col(cols='4' style='left:5%;bottom:40%').position-absolute
        b-table-simple.table-borderless
          tbody
            tr
              td(style='width:25px')
                font-awesome-icon(:icon='["fas","circle"]' style='color:#F44438;font-size:10px')
              td(style='color:#7e7e7e')
                h5 {{ currentText }}
      b-col(cols='3' style='left:6%;bottom:20%').position-absolute
        p(style='color:#7e7e7e;font-size:15px') .....Only show the first four tasks.....
      b-col(cols='12' class='m-auto d-flex justify-content-center align-items-center')
        //- 暫停/停止時顯示撥放按鈕
        b-btn(v-if='status !== 1' @click='start' class='p-0 m-auto position-relative timingbtn')
          h1 {{ timeText }}
            //- font-awesome-icon(:icon='["fas", "play"]' class='ml-auto mt-5 btn-block')
            p(class='position-absolute m-0 txtbtn') Start
        //- 倒數中顯示暫停按鈕
        b-btn(v-if='status === 1' @click='pause' class='p-0 m-auto position-relative timingbtn')
          h1 {{ timeText }}
            //- font-awesome-icon(:icon='["fas", "pause"]' class='ml-auto mt-5 btn-block' class='ml-auto mt-5 btn-block')
            p(class='position-absolute m-0 txtbtn') Stop
        //- 目前在倒數事項的文字長度大於零(只要有東西在數)就顯示跳過按鈕
        //- @click='finish(true)' 直接執行 finish 的 function，但會帶一個 true 或 false 的參數判斷是不是 skip
        //- 點跳過的參數是 true
        //- b-btn(v-if='current.length > 0' @click='finish(true)' class='p-0 m-auto position-relative timingbtn')
        //-   h1 {{timeText}}
        //-     font-awesome-icon(:icon='["fas", "step-forward"]')
    b-row(class='mt-4 d-flex justify-content-center align-items-center')
      h2(style='margin-right: 50px;font-size: 26px;font-weight: bold;text-decoration: none;padding: 3px;color: #595959;border-bottom: 5px solid #595959;') Work
      h2(style='margin-left: 50px;font-size: 26px;font-weight: bold;text-decoration: none;padding: 3px;color: #ADADAD;') Break
    b-row( style='height:25px;background:#F44438').p-0.fixed-bottom
      h1
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // setinterval 給一個值，才不會 clearinterval 時連變數一起清掉
      timer: 0
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.state.list
    },
    current () {
      return this.$store.state.current
    },
    currentText () {
      let text = this.current
      // 如果 current 是空的
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = 'The First Task'
        } else {
          text = '點擊開始'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    }
  },
  methods: {
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        // 改 current
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            // 正常倒數的 finish 參數是 false
            this.finish(false)
          }
        }, 1000)
      }
    },
    // 點按鈕跳過的 finish 參數是 true
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      // 如果不是 skip (正常倒數的 finish)就播放音效
      if (!skip) {
        const audio = new Audio()
        audio.src = require('../assets/' + this.$store.state.sound)
        audio.play()
      }

      // 時間到後待辦清單中還有下一項就進入下一個
      if (this.list.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          text: '結束'
        })
      }
    }
  }
}
</script>

<style>
  .timingbtn{
     width:256px;
     height:256px;
     background:#F44438;
     border-radius:2.5rem;
     box-shadow: 0 0 61px -15px #D60000;
     border:none;
  }
  .timingbtn:hover{
     width:256px;
     height:256px;
     background:#F44438;
     border-radius:2.5rem;
     box-shadow: 0 0 61px -15px #D60000;
     border:none;
  }
  .txtbtn {
     width:109px;
     height:40px;
     background:#fff;
     color:#F44438;
     right:0;
     bottom:0;
     border-radius:40px 0;
     line-height:40px;
     font-size:25px;
  }
</style>
