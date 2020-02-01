
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  // props: ['styles'],
  mounted () {
    this.renderChart(this.chartData, this.styles)
  }
}
