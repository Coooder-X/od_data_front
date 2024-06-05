<template>
  <div class="file-select">
		<el-select v-model="curFile" placeholder="file" style="width: 240px" @change="selectFile">
      <el-option
        v-for="file in fileList"
        :key="file"
        :label="file"
        :value="file"
      />
    </el-select>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import bus from "../mitt";
import { getHistoryFile, getHistoryFileList } from '@/request';

export default {
  name: "PairDetail",
  setup() {
		const fileList = ref([])
		const curFile = ref('')

		onMounted(async() => {
			fileList.value = await getHistoryFileList()
		})
		
    const selectFile = async() => {
			const historyGraph = await getHistoryFile({params: {
				filename: curFile.value
			}})
			bus.emit('drawHistory', historyGraph)
		}

    return {
      selectFile,
			curFile,
			fileList,
    };
  },
};
</script>

<style scoped>
.file-select {
  border: 1px black solid;
  height: 200px;
  width: 600px;
}
</style>