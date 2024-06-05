<template>
	<div class="home-div">
		<map-grid></map-grid>
		<data-panel></data-panel>
	</div>
</template>

<script>
import MapGrid from '../components/MapPanel.vue'
import DataPanel from '../components/DataPanel.vue'

export default {
  name: 'HomePage',
  components: {
    MapGrid,
	DataPanel,
  }
}
</script>

<style>
	.home-div {
		margin: auto;
		width: 1400px;
		height: 800px;
		border: 1px black solid;
		display: flex;
	}
</style>