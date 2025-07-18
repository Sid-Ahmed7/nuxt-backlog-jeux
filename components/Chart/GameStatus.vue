<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip, type ChartOptions  } from 'chart.js';

import type { UserGame } from '@/types/UserGame';
import { GameStatus } from '@/types/enums';


Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    games: UserGame[]
}>()

const gameNotStarted = computed(() => {
    return props.games.filter(game => game.status === GameStatus.NotStarted).length
})
const gameInProgress = computed(() => {
        return props.games.filter(game => game.status === GameStatus.InProgress).length

})

const gameFinished = computed(() => {
        return props.games.filter(game => game.status === GameStatus.Finished).length

})

const data = computed(() => ({
    labels: ['Non commencés','En cours', 'Terminés', ],
    datasets: [{
        label: 'Nombre de jeux',
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
        data: [gameNotStarted.value, gameInProgress.value, gameFinished.value]
    }]
}))

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {display: false},
        title: {display: true, text: 'Répartition des jeux en cours et terminés '}
    },
scales: {
    x: {
      ticks: { color: '#000' },
      grid: { color: 'rgba(0,0,0,0.1)' }
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: '#000' },
      grid: { color: 'rgba(0,0,0,0.1)' }
    }
  }
}
</script>

<template>
 <div class="chart">
    <Bar :data="data" :options="options" />
 </div>
</template>

<style scoped>

.chart {
    margin: auto;
    margin-bottom: 2rem;
}
</style>