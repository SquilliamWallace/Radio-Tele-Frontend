<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['value', 'styles'],
  data() {
      return {
          datacollection: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
                {
                    label: 'Radio Frequency Intensity Over Time',
                    backgroundColor: '#0c03b2',
                    data: [4, 2, 5, 3.5]
                }
            ]
      },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time Stamp',
                        fontColor: '#111111'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature',
                        fontColor: '#111111'
                    }
                }]
            }
        }
    }
  },
  mounted () {
    this.renderChart(this.value, this.options)
  }
}
</script>

<style scoped>
</style>