(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["settings"],{"26d3":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"settings"}},[n("b-container",[n("b-table",{attrs:{items:e.items,fields:e.fields},on:{"row-clicked":e.select},scopedSlots:e._u([{key:"cell(src)",fn:function(e){return[n("audio",{attrs:{controls:"",src:s("1771")("./"+e.value)}})]}},{key:"cell(select)",fn:function(t){return[e.sound===t.item.src?n("font-awesome-icon",{attrs:{icon:["fas","check"]}}):e._e()]}}])})],1)],1)},c=[],l={name:"Settings",data:function(){return{items:[{name:"鈴聲",src:"alarm.mp3"},{name:"Yay",src:"yay.mp3"}],fields:[{key:"name",label:"名稱"},{key:"src",label:"試聽"},{key:"select",label:"選擇"}]}},computed:{sound:function(){return this.$store.state.sound}},methods:{select:function(e){this.$store.commit("selectSound",e.src)}}},o=l,r=s("2877"),a=Object(r["a"])(o,n,c,!1,null,null,null);t["default"]=a.exports}}]);
//# sourceMappingURL=settings.eaca4581.js.map