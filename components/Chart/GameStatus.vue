<script setup lang="ts">
import {computed} from 'vue';
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip, type ChartOptions  } from 'chart.js';

import type { UserGame } from '~/types/UserGame';


Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    games: UserGame[]
}>()

const gameInProgress = computed(() => {
    return props.games.filter(game => !game.isFinished).length
})

const gameFinished = computed(() => {
    return props.games.filter(game => game.isFinished).length
})

const data = computed(() => ({
    labels: ['En cours', 'Terminés', 'Non commencés'],
    datasets: [{
        label: 'Nombre de jeux',
        backgroundColor: ['#3498db', '#2ecc71'],
        data: [gameInProgress.value, gameFinished.value]
    }]
}))

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {display: false},
        title: {display: true, text: 'Répartition des jeux en cours et terminés '}
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            }
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
    max-width: 400px;
    margin: auto;
    margin-bottom: 2rem;
}
</style>