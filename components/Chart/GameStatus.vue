<script setup lang="ts">
import {computed} from 'vue';
import { Doughnut } from 'vue-chartjs';
import { ArcElement, Chart, Legend, plugins, Title, Tooltip, type ChartOptions  } from 'chart.js';

import type { UserGame } from '~/types/UserGame';


Chart.register(Title, Tooltip, Legend, ArcElement)

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
    labels: ['Jeux en cours', 'Jeux terminés'],
    datasets: [{
        backgroundColor: ['#3498db', '#2ecc71'],
        data: [gameInProgress.value, gameFinished.value]
    }]
}))

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        legend: {position: "top"},
        title: {display: true, text: 'Répartition des jeux en cours et terminés '}
    }
}
</script>

<template>
 <div class="chart">
    <Doughnut :data="data" :options="options" />
 </div>
</template>

<style scoped>

.chart {
    max-width: 400px;
    margin: auto;
    margin-bottom: 2rem;
}
</style>