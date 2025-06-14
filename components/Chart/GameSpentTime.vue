<script setup lang="ts">
import {computed} from 'vue';
import { Pie } from 'vue-chartjs';
import { ArcElement, Chart, Legend, plugins, Title, Tooltip, type ChartOptions  } from 'chart.js';
import type { UserGame } from '~/types/UserGame';


Chart.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
    games: UserGame[]
}>()

const data = computed(() => {
    
    const userSpentTime = props.games.filter(game => game.timeSpent)

    return {
        labels: userSpentTime.map(t => t.game.name),
        datasets: [{
            labels: 'Temps passé en heure',
            data: userSpentTime.map(t => t.timeSpent ?? 0),
            backgroundColor: [
                '#00ffcc',
                '#ff4d4d',
                '#3498db',
                '#9b59b6',
                '#f1c40f',
                '#e67e22',
                '#1abv9c'
            ]
        }]
    }
})

const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
        legend: {position: "top"},
        title: {display: true, text: 'Temps passé par jeu '}
    }
}
</script>

<template>
 <div class="chart">
    <Pie :data="data" :options="options" />
 </div>
</template>

<style scoped>

.chart {
    max-width: 400px;
    margin: auto;
    margin-bottom: 2rem;
}
</style>