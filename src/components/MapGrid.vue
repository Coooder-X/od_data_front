
<template>
  <!-- <div class="map" id="map"> -->
  <!-- <div v-for="id in gridIds" :key="id" class="grid" @click="clickGrid(id)">
      {{ id }}
    </div> -->
  <!-- </div> -->
  <div class="map" />
</template>

<script>
import { inject, ref, onMounted, computed, watch } from "vue";
import * as d3 from "d3";
import bus from "../mitt";

const SELECTED_COLOR = 'rgb(255, 209, 148)'

export default {
  setup() {
    const gridIds = ref([]);
		const svg = ref(null)
		const grids = ref(null)
    const gridPair = inject("gridPair"); //ref([])
		const pairs = inject('pairs')
    const totalOdInfo = inject('totalOdInfo')
    // console.log('-----------------', gridPair.value.length)
    const editMode = ref(true);

    bus.on("cancelAdd", () => {
      editMode.value = false;
      gridPair.value = [];
    });

		const selectedGrids = computed({
			get() {
				const res = []
				pairs.value.forEach(item => res.push(item.start, item.end))
				return new Set(res)
			}
		})

    for (let j = 9; j >= 0; --j) {
      for (let i = 0; i <= 9; ++i) {
        gridIds.value.push({
          x: j * 50,
          y: (9 - i) * 50,
          id: i * 10 + j,
        });
      }
    }
    console.log(gridIds.value);

    onMounted(() => {
      initLayer();
    });

    const initLayer = () => {
      svg.value = d3
        .select("#map-grid")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("fill", "#f1f")
        .style("position", "absolute")
        .style("z-index", 2);

      console.log("svg", d3.select(document.getElementById("map")));
      grids.value = svg.value
        .selectAll(".grid")
        .data(gridIds.value)
        .enter()
        .append("g");

      grids.value
        .append("rect")
        .attr("class", "grid")
        .attr("x", function (d) {
          return d.x;
        })
        .attr("y", function (d) {
          return d.y;
        })
        .attr("width", 50)
        .attr("height", 50)
        .style("stroke", "#000")
        .style("fill", "#fff")
				.style("cursor", "pointer")
        .on("mouseover", function () {
          d3.select(this).style("fill", "rgb(255, 241, 223)");
        })
        .on("mouseout", function () {
					let d = d3.select(this).datum();
          d3.select(this).style("fill", selectedGrids.value.has(d.id)? SELECTED_COLOR : "#fff");
        })
        .on("click", function () {
          let d = d3.select(this).datum();
          clickGrid(d.id);
        });

      grids.value
        .append("text")
        .attr("x", function (d) {
          return d.x + 25;
        }) // 设置文本在小网格中的位置
        .attr("y", function (d) {
          return d.y + 25;
        })
        .style("pointer-events", "none")
        .attr("dy", ".35em") // 垂直居中
        .attr("text-anchor", "middle") // 水平居中
        .text(function (d) {
          return d.id;
        }); // 显示ID

      console.log("grids", grids);
    };

		watch(selectedGrids, () => {
			grids.value
				.selectAll('rect')
				.style('fill', function(d) {
					return selectedGrids.value.has(d.id)? SELECTED_COLOR : 'white'
				})
		})

    const clickGrid = (id) => {
      if (gridPair.value.length < 2) {
        gridPair.value.push(id);
      } else {
        gridPair.value = [id]
      }
    };

    const addLine = ({st, ed}) => {
      const pairName = `${st}_${ed}`
      console.log('st, ed1', st, ed);
      st = gridIds.value.find(item => item.id === st)
      ed = gridIds.value.find(item => item.id === ed)
      console.log('st, ed2', st, ed);
      drawLine(st, ed, Math.min(10, totalOdInfo.value.get(pairName) ?? 0))
    }

    const drawLine = (st, ed, width) => {
      const pairId = `od-${st.id}-${ed.id}`
      svg.value.append('line')
        .attr('x1', st.x + 25)
        .attr('y1', st.y + 25)
        .attr('x2', ed.x + 25)
        .attr('y2', ed.y + 25)
        .attr('id', pairId)
        .attr('stroke', 'blue')
        .attr('stroke-width', width)
    }

    const removeLine = ({st, ed}) => {
      const pairId = `od-${st}-${ed}`
      // console.log('lines', pairName, d3.select(`#${pairName}`))
      const lineToRemove = svg.value.select(`#${pairId}`) //svg.value.selectAll('line').select(`#${pairName}`)
      lineToRemove.remove()
    }

    const drawHistory = (historyGraph) => {
      console.log('drawHistory', historyGraph)
      const gridIdSet = new Set()
      historyGraph.forEach(item => {
        gridIdSet.add(...[item['start'], item['end']])
        const st = gridIds.value.find(d => d.id === item['start'])
        const ed = gridIds.value.find(d => d.id === item['end'])
        drawLine(st, ed, 5)
      })
      grids.value
        .select("rect")
        .style("fill", function(d) {
          if (gridIdSet.has(d.id)) {
            return "rgb(255, 241, 223)"
          } else {
            return 'white'
          }
        })
    }

    bus.on('addLineFunc', addLine)
    bus.on('removeLineFunc', removeLine)
    bus.on('drawHistory', drawHistory)

    return {
      gridIds,
      gridPair,
      editMode,
      clickGrid,
      addLine,
      removeLine,
    };
  },
};
</script>


<style scoped>
.map {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px black solid;
  width: 500px;
  height: 500px;
  /* display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto; */
}
.grid {
  box-shadow: inset 0 0 0 1px #000;
  background-color: white;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.grid:hover {
  background-color: rgb(255, 241, 223);
	/* background-color: rgb(255, 209, 148); */
}
</style>