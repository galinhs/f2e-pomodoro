<template lang="pug">
#home
  b-container
    b-row(class='h-50 d-flex justify-content-center align-items-center')
      b-col(cols='3').d-flex.align-items-end
        h2 {{ currentText }}
        h2
      b-col(cols='9' class='m-auto d-flex justify-content-center align-items-center')
        //- 暫停/停止時顯示撥放按鈕
        b-btn(to='/' variant='danger' v-if='status !== 1' @click='start' size='lg' class='w-25 h-50 m-auto')
          h1 {{ timeText }}
            font-awesome-icon(:icon='["fas", "play"]' class='ml-auto mt-5 btn-block')
        //- 倒數中顯示暫停按鈕
        b-btn(variant='primary' v-if='status === 1' @click='pause' size='lg' class='w-25 h-50 m-auto')
          h1 {{ timeText }}
            font-awesome-icon(:icon='["fas", "pause"]')
        //- 目前在倒數事項的文字長度大於零(只要有東西在數)就顯示跳過按鈕
        //- @click='finish(true)' 直接執行 finish 的 function，但會帶一個 true 或 false 的參數判斷是不是 skip
        //- 點跳過的參數是 true
        b-btn(variant='primary' v-if='current.length > 0' @click='finish(true)' size='lg' class='w-25 h-50 m-auto')
          h1 {{ timeText }}
            font-awesome-icon(:icon='["fas", "step-forward"]')
    b-row(class='p-0 bg-primary fixed-bottom')
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
          text = '沒有事項'
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
