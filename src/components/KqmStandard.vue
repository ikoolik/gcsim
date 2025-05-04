<template>
  <div class="kqms">
    <div class="stats-block">
      <div class="stats-row">
        <div class="stats-item" :class="{ success: totalInputs === 40 }">
          <div class="stats-title">Substat Rolls</div>
          <div class="stats-value">{{ totalInputs }}/40</div>
        </div>
        <div class="stats-item" :class="{ success: totalMainStats === 5 }">
          <div class="stats-title">Main Stats</div>
          <div class="stats-value">{{ statRollsStore.totalMainStats }}/5</div>
        </div>
        <div class="stats-item" :class="{ success: isRatioIdeal }">
          <div class="stats-title">CD/CR Ratio</div>
          <div class="stats-value">{{ cdCrRatio.toFixed(2) }}</div>
          <div class="stats-target">Target: 2.00</div>
        </div>
      </div>
    </div>
    <div class="artifact-level-selector">
      <label for="artifact-level">Artifact Level:</label>
      <select id="artifact-level" v-model="statRollsStore.artifactLevel">
        <option value="0">+0</option>
        <option value="4">+4</option>
        <option value="8">+8</option>
        <option value="12">+12</option>
        <option value="16">+16</option>
        <option value="20">+20</option>
      </select>
    </div>
    <div class="input-group">
      <div class="stat-label">
        <span>HP</span>
        <span class="main-stat">(1)</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.hp">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.hp" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.hp }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('hpPercent')" @click.right.prevent="statRollsStore.decrementMainStat('hpPercent')">
        <span>HP%</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.hpPercent > 0">({{ statRollsStore.activeMainStats.hpPercent }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.hpPercent">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.hpPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.hpPercent }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label">
        <span>ATK</span>
        <span class="main-stat">(1)</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.atk">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.atk" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.atk }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('atkPercent')" @click.right.prevent="statRollsStore.decrementMainStat('atkPercent')">
        <span>ATK%</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.atkPercent > 0">({{ statRollsStore.activeMainStats.atkPercent }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.atkPercent">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.atkPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.atkPercent }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label">
        <span>DEF</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.def">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.def" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.def }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('defPercent')" @click.right.prevent="statRollsStore.decrementMainStat('defPercent')">
        <span>DEF%</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.defPercent > 0">({{ statRollsStore.activeMainStats.defPercent }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.defPercent">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.defPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.defPercent }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('em')" @click.right.prevent="statRollsStore.decrementMainStat('em')">
        <span>EM</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.em > 0">({{ statRollsStore.activeMainStats.em }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.em">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.em" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.em }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('er')" @click.right.prevent="statRollsStore.decrementMainStat('er')">
        <span>ER</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.er > 0">({{ statRollsStore.activeMainStats.er }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.er">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.er" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.er }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('cr')" @click.right.prevent="statRollsStore.decrementMainStat('cr')">
        <span>CR</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.cr > 0">({{ statRollsStore.activeMainStats.cr }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.cr">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.cr" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.cr }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('cd')" @click.right.prevent="statRollsStore.decrementMainStat('cd')">
        <span>CD</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.cd > 0">({{ statRollsStore.activeMainStats.cd }})</span>
      </div>
      <input type="number" v-model="statRollsStore.rollCounts.cd">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.cd" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.cd }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="statRollsStore.incrementMainStat('dmgPercent')" @click.right.prevent="statRollsStore.decrementMainStat('dmgPercent')">
        <span>DMG%</span>
        <span class="main-stat" v-if="statRollsStore.activeMainStats.dmgPercent > 0">({{ statRollsStore.activeMainStats.dmgPercent }})</span>
      </div>
      <div class="input-placeholder"></div>
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.dmgPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.dmgPercent }}</span>
    </div>
    <FormattedStats />
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'
import FormattedStats from './FormattedStats.vue'

export default {
  name: 'KqmStandard',
  components: {
    FormattedStats
  },
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  data() {
    return {
      externalBonus: {
        hp: 0,
        hpPercent: 0,
        atk: 0,
        atkPercent: 0,
        def: 0,
        defPercent: 0,
        em: 0,
        er: 0,
        cr: 0,
        cd: 0,
        dmgPercent: 0
      }
    }
  },
  computed: {
    totalInputs() {
      return Object.values(this.statRollsStore.rollCounts).reduce((sum, value) => sum + Number(value), 0)
    },
    totalMainStats() {
      return Object.values(this.statRollsStore.activeMainStats).reduce((sum, value) => sum + Number(value), 0)
    },
    finalStats() {
      return {
        hp: (this.statRollsStore.getStatValue('hp') + Number(this.externalBonus.hp)).toFixed(2),
        hpPercent: (this.statRollsStore.getStatValue('hpPercent') + Number(this.externalBonus.hpPercent)).toFixed(2),
        atk: (this.statRollsStore.getStatValue('atk') + Number(this.externalBonus.atk)).toFixed(2),
        atkPercent: (this.statRollsStore.getStatValue('atkPercent') + Number(this.externalBonus.atkPercent)).toFixed(2),
        def: (this.statRollsStore.getSubstatValue('def') + Number(this.externalBonus.def)).toFixed(2),
        defPercent: (this.statRollsStore.getStatValue('defPercent') + Number(this.externalBonus.defPercent)).toFixed(2),
        em: (this.statRollsStore.getStatValue('em') + Number(this.externalBonus.em)).toFixed(2),
        er: (this.statRollsStore.getStatValue('er') + Number(this.externalBonus.er)).toFixed(2),
        cr: (this.statRollsStore.getStatValue('cr') + Number(this.externalBonus.cr)).toFixed(2),
        cd: (this.statRollsStore.getStatValue('cd') + Number(this.externalBonus.cd)).toFixed(2),
        dmgPercent: (this.statRollsStore.getStatValue('dmgPercent') + Number(this.externalBonus.dmgPercent)).toFixed(2)
      }
    },
    cdCrRatio() {
      return this.finalStats.cd / this.finalStats.cr
    },
    isRatioIdeal() {
      return Math.abs(this.cdCrRatio - 2) < 0.1
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

.input-group {
  display: grid;
  grid-template-columns: 80px 100px 80px 80px;
  align-items: center;
  gap: 10px;
}

.stat-label {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;
}

.stat-label:hover {
  color: #2196f3;
}

.main-stat {
  color: #4caf50;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.final-value {
  text-align: right;
  color: #666;
}

.input-placeholder {
  width: 100px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.artifact-level-selector label {
  font-weight: bold;
}

.artifact-level-selector select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.artifact-level-selector select:focus {
  outline: none;
  border-color: #2196f3;
}
</style>
