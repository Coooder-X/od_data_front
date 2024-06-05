<template>
  <div class="select-list">
    <div class="flex-list gap-2">
      <el-tag
        v-for="pair in pairs"
        :key="pair.name"
        closable
        :disable-transitions="false"
        type="primary"
				@close="handleDeletePair(pair)"
				style="marginTop: 10px;marginLeft:15px;"
      >
        {{ pair.name }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import bus from '../mitt'

export default {
  name: "SelectList",
  setup() {
    const pairs = inject('pairs')	//ref([]);
		const totalOdInfo = inject('totalOdInfo')
    // one pair is like: {start: xx, end: xx, name: xx}
		const handleDeletePair = (pair) => {
			console.log('delete', pair)
			pairs.value = pairs.value.filter(item => item != pair)
			bus.emit('removeLineFunc', {st: pair.start, ed: pair.end})
		}

	bus.on('addPairEmit', ({start, end}) => {
			console.log('addPairEmit', start, end);
			const pairName = `${start}_${end}`
			const item = {
				start,
				end,
				id: `${start}-${end}`,
				name: `${start}-${end} (${totalOdInfo.value.get(pairName) ?? 0})`,
			}
			if (pairs.value.indexOf(item) === -1) {
				pairs.value.push(item)
				bus.emit('addLineFunc', {st: start, ed: end})
			}
		})

		return {
			pairs,
			handleDeletePair,
			totalOdInfo,
		}
  },

};
</script>

<style scoped>
.select-list {
  border: 1px black solid;
  height: 200px;
  width: 600px;
}
.flex-list {
	display: flex;
	justify-content: start;
	flex-wrap: wrap;
}
</style>