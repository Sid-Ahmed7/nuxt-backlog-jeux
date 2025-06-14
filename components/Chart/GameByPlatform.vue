<script setup lang="ts">
import {computed} from 'vue';
import { Bar } from 'vue-chartjs';
import { BarElement, CategoryScale, Chart, Legend, LinearScale, plugins, Title, Tooltip, type ChartOptions  } from 'chart.js';
import type { UserGame } from '~/types/UserGame';

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const props = defineProps<{
    games: UserGame[]
}>()

const counts: Record<string, number> = {}

const data = computed(() => {
    
    props.games.forEach(game => {
        const platform = game.platform_choose || 'Aucune plateforme'
        counts[platform] = (counts[platform] || 0) +1
    })

    return {
        labels: Object.keys(counts),
        datasets: [{
            label: 'Nombre de jeux',
            data: Object.values(counts),
            backgroundColor: '#00ffcc'
        }]
    }
})

const options = {
    responsive: true,
    plugins: {
        legend: {display: false},
        title: {display: true, text: 'Nombre de jeux par plateforme'}
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