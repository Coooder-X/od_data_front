<template>
	<div class="data-panel-container">
		<pair-detail />
		<select-list />
		<el-button @click="saveBackendData"> save  </el-button>
		<file-select />
	</div>
</template>

<script>
import PairDetail from './PairDetail.vue'
import SelectList from './SelectList.vue'
import { inject } from "vue";
import { saveSelectedData } from '@/request';
import FileSelect from './FileSelect.vue';

export default {
  components: { PairDetail, SelectList, FileSelect },
  name: 'DataPanel',

	setup() {
		const pairs = inject('pairs')

		const saveBackendData = async() => {
			saveSelectedData({ pairs: pairs.value })
		}

		// const saveJsonData = () => {
		// 	const json = JSON.stringify(pairs.value, null, 2)
		// 	const blob = new Blob([json], {type: "application/json"});  // 创建 Blob 对象
		// 	const url  = URL.createObjectURL(blob);  // 创建 Blob URL
		// 	const a = document.createElement('a');  // 创建一个链接
		// 	a.href = url;
		// 	a.download = "od_graph_.json";  // 设置文件名
		// 	a.click();  // 模拟点击
		// }

		// const saveData = async() => {
		// 	saveJsonData()
		// 	await saveBackendData()
		// }

		return {
			saveBackendData
		}
	}

}
</script>

<style scoped>
	.data-panel-container {
		border: 1px black solid;
		height: 100%;
		width: 600px;
		display: flex;
		flex-direction: column;
	}
</style>