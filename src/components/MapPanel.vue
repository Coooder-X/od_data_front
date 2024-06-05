<template>
	<div class="map-grid-container">
		<div class="time-select">
			<div class="slider-block">
				{{'日期:'}}<el-slider v-model="dateScope" range show-stops :min="1" :max="31" />
				{{'时间:'}}<el-slider v-model="timeScope" range show-stops :max="24" />
			</div>
		</div>
		<map-grid id="map-grid"/>
	</div>
</template>

<script>
import { inject, ref, watch } from "vue";
import MapGrid from './MapGrid.vue';
import { getOdGraphByTime } from '@/request';
import { debounce } from 'lodash';

export default {
  name: 'MapPanel',
	components: {
		MapGrid
	},
	setup() {
		const dateScope = ref([4, 5])
		const timeScope = ref([0, 24])
		const totalOdInfo = inject('totalOdInfo')

		const commitTimeChange = debounce(async () => {
			console.log('time change', dateScope.value, timeScope.value)
			const [ startDay, endDay ] = dateScope.value
			const [ startHour, endHour ] = timeScope.value
			totalOdInfo.value = await getOdGraphByTime({	
				params: {
					startDay, endDay, startHour, endHour
				}
			})
			console.log('totalOdInfo', totalOdInfo.value);
		}, 3000)

		watch([dateScope, timeScope], commitTimeChange, {deep: true, immediate: true})

		return {
			dateScope,
			timeScope,
		}
	}
}
</script>

<style scoped>
	.map-grid-container {
		display: flex;
		border: 1px black solid;
		background-color: aliceblue;
		height: 100%;
		width: 800px;
		position: relative;
	}
	.time-select {
		/* background-color: antiquewhite; */
		height: 200px;
		width: 100%;
		position: absolute;
	}
	.map {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: 1px black solid;
		width: 500px;
		height: 500px;
		display: flex;
		flex-wrap: wrap;
		flex: 0 1 auto;
	}
	.grid {
		box-shadow: inset 0 0 0 1px #000;
		background-color: white;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
	
	.slider-block {
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.slider-block .el-slider {
		margin-top: 0;
		margin-left: 100px;
	}
</style>