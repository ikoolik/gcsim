<template>
  <div class="kqms">
    <div class="stats-block">
      <div class="stats-row">
        <div class="stats-item" :class="{ success: statRollsStore.substatRollsCount === 40 }">
          <div class="stats-title">Substats</div>
          <div class="stats-value">{{ statRollsStore.substatRollsCount }}/40</div>
        </div>
        <div class="stats-item" :class="{ success: totalMainStats === 5 }">
          <div class="stats-title">Main Stats</div>
          <div class="stats-value">{{ statRollsStore.totalMainStats }}/5</div>
        </div>
        <CritRatio />
      </div>
    </div>
    <ArtifactLevelSelector />
    <StatLine label="HP" statKey="hp" />
    <StatLine label="HP%" statKey="hpPercent" />
    <StatLine label="ATK" statKey="atk" />
    <StatLine label="ATK%" statKey="atkPercent" />
    <StatLine label="DEF" statKey="def" />
    <StatLine label="DEF%" statKey="defPercent" />
    <StatLine label="EM" statKey="em" />
    <StatLine label="ER" statKey="er" />
    <StatLine label="CR" statKey="cr" />
    <StatLine label="CD" statKey="cd" />
    <StatLine label="DMG%" statKey="dmgPercent" :showInput="false" />
    <FormattedStats />
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'
import FormattedStats from './FormattedStats.vue'
import CritRatio from './CritRatio.vue'
import ArtifactLevelSelector from './ArtifactLevelSelector.vue'
import StatLine from './StatLine.vue'

export default {
  name: 'KqmStandard',
  components: {
    FormattedStats,
    CritRatio,
    ArtifactLevelSelector,
    StatLine
  },
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  computed: {
    totalMainStats() {
      return Object.values(this.statRollsStore.activeMainStats).reduce((sum, value) => sum + Number(value), 0)
    }
  }
}
</script>

<style scoped>
.kqms {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.stats-block {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.stats-item {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
}

.stats-item.success {
  background-color: #4caf50;
  color: white;
}

.stats-title {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9em;
}

.stats-value {
  font-size: 1.2em;
  font-weight: bold;
  margin: 5px 0;
}

.stats-target {
  font-size: 0.8em;
  opacity: 0.8;
}

.input-placeholder {
  display: none;
}

.ratio-block {
  display: none;
}

.external-bonus-container {
  display: flex;
  justify-content: center;
}

.external-bonus-input {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9em;
}

.external-bonus-input::placeholder {
  color: #999;
  font-size: 0.8em;
}

.artifact-level-selector {
  display: none;
}
</style>
