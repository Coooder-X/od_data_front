<template>
  <div class="pair-detail">
		<div class="detail-container">
			<div class="grid">{{ localGridPair[0] }}</div>
			<div class="grid">{{ localGridPair[1] }}</div>
			<el-button style="marginLeft: 50px;" @click="addPair">add</el-button>
			<el-button @click="cancelAdd">cancel</el-button>
		</div>
    <div class="detail-container">
      <div><span>轨迹数量：{{ trjNum }}</span></div>
    </div>
  </div>
</template>

<script>
import { computed, inject, watch, ref, onMounted } from 'vue';
import bus from "../mitt";

export default {
  name: "PairDetail",
  setup() {
		const gridPair = inject('gridPair')
    const totalOdInfo = inject('totalOdInfo')
		const localGridPair = computed({
			get() {
				if (gridPair.value.length === 0)
					return ['', '']
				return [gridPair.value[0], gridPair.value.length === 2? gridPair.value[1] : '']
			}
		})

    // const trjNum = computed({
    //   get() {
    //     const pairName = `${localGridPair.value[0]}_${localGridPair.value[1]}`
    //     if (totalOdInfo.has(pairName))
    //       return totalOdInfo.get(pairName)
    //     return 0
    //   }
    // })
    const trjNum = ref(0)
    watch(localGridPair, (v) => {
      const pairName = `${localGridPair.value[0]}_${localGridPair.value[1]}`
      if (typeof(v[0]) === 'number' && typeof(v[1]) === 'number' && totalOdInfo.value.has(pairName)) {
        console.log(`================== ${totalOdInfo.value.get(pairName)}`);
        trjNum.value = totalOdInfo.value.get(pairName)
      } else
        trjNum.value = 0
    })


    const addPair = () => {
      console.log("add");
      bus.emit("addPairEmit", {start: localGridPair.value[0], end: localGridPair.value[1]});
			gridPair.value = []
    };

    const cancelAdd = () => {
      console.log("cancelAdd");
      bus.emit("cancelAdd");
    };

    // 鼠标右键点击时执行的函数
    function myFunction(event) {
      addPair()
      event.preventDefault();  // 阻止默认的右键菜单
    }

    onMounted(() => {
      document.addEventListener('contextmenu', myFunction);
    })

    return {
      addPair,
      cancelAdd,
			gridPair,
			localGridPair,
      trjNum,
    };
  },
};
</script>

<style scoped>
.pair-detail {
  border: 1px black solid;
  height: 200px;
  width: 600px;
}
.grid {
  box-shadow: inset 0 0 0 1px #000;
  background-color: white;
  width: 50px;
  height: 50px;
	margin-left: 20px;
}
.detail-container {
	display: flex;
}
</style>