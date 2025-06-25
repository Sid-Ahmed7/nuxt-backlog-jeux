<script setup lang="ts">
import {computed} from 'vue';
import { Doughnut } from 'vue-chartjs';
import { ArcElement, CategoryScale, Chart, Legend, Title, Tooltip, type ChartOptions  } from 'chart.js';
import type { UserGame } from '~/types/UserGame';

Chart.register(Title, Tooltip, Legend, CategoryScale, ArcElement)

const props = defineProps<{
    games: UserGame[]
}>()

const counts: Record<string, number> = {}

const data = computed(() => {
    const nb: Record<string, number> = {}

    props.games.forEach(game => {
        const platform = game.platform_choose || 'Aucune plateforme'
        counts[platform] = (counts[platform] || 0) +1
    })

    return {
        labels: Object.keys(counts),
        datasets: [{
            data: Object.values(counts),
            backgroundColor: [
                '#3498db', '#2ecc71', '#f1c40f', '#e67e22', '#9b59b6',
                '#1abc9c', '#e74c3c', '#34495e', '#95a5a6', '#7f8c8d'
            ]
        }]
    }
})

const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        legend: {position: "top"},
        title: {display: true, text: 'Nombre de jeux par plateforme'}
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