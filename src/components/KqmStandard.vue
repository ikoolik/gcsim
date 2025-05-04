<template>
  <div class="kqms">
    <div class="stats-block">
      <div class="stats-row">
        <div class="stats-item" :class="{ success: totalInputs === 20 }">
          <div class="stats-title">Substat Rolls</div>
          <div class="stats-value">{{ totalInputs }}/20</div>
        </div>
        <div class="stats-item" :class="{ success: totalMainStats === 5 }">
          <div class="stats-title">Main Stats</div>
          <div class="stats-value">{{ totalMainStats }}/5</div>
        </div>
        <div class="stats-item" :class="{ success: isRatioIdeal }">
          <div class="stats-title">CD/CR Ratio</div>
          <div class="stats-value">{{ cdCrRatio.toFixed(2) }}</div>
          <div class="stats-target">Target: 2.00</div>
        </div>
      </div>
    </div>
    <div class="input-group">
      <div class="stat-label">
        <span>HP</span>
        <span class="main-stat">(1)</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.hp">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.hp" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.hp }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('hpPercent')" @click.right.prevent="decrementMainStat('hpPercent')">
        <span>HP%</span>
        <span class="main-stat" v-if="mainStats.hpPercent > 0">({{ mainStats.hpPercent }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.hpPercent">
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
      <input type="number" v-model="substatRollsStore.rollCounts.atk">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.atk" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.atk }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('atkPercent')" @click.right.prevent="decrementMainStat('atkPercent')">
        <span>ATK%</span>
        <span class="main-stat" v-if="mainStats.atkPercent > 0">({{ mainStats.atkPercent }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.atkPercent">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.atkPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.atkPercent }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('def')" @click.right.prevent="decrementMainStat('def')">
        <span>DEF</span>
        <span class="main-stat" v-if="mainStats.def > 0">({{ mainStats.def }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.def">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.def" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.def }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('defPercent')" @click.right.prevent="decrementMainStat('defPercent')">
        <span>DEF%</span>
        <span class="main-stat" v-if="mainStats.defPercent > 0">({{ mainStats.defPercent }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.defPercent">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.defPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.defPercent }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('em')" @click.right.prevent="decrementMainStat('em')">
        <span>EM</span>
        <span class="main-stat" v-if="mainStats.em > 0">({{ mainStats.em }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.em">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.em" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.em }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('er')" @click.right.prevent="decrementMainStat('er')">
        <span>ER</span>
        <span class="main-stat" v-if="mainStats.er > 0">({{ mainStats.er }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.er">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.er" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.er }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('cr')" @click.right.prevent="decrementMainStat('cr')">
        <span>CR</span>
        <span class="main-stat" v-if="mainStats.cr > 0">({{ mainStats.cr }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.cr">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.cr" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.cr }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('cd')" @click.right.prevent="decrementMainStat('cd')">
        <span>CD</span>
        <span class="main-stat" v-if="mainStats.cd > 0">({{ mainStats.cd }})</span>
      </div>
      <input type="number" v-model="substatRollsStore.rollCounts.cd">
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.cd" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.cd }}</span>
    </div>
    <div class="input-group">
      <div class="stat-label" @click.left="incrementMainStat('dmgPercent')" @click.right.prevent="decrementMainStat('dmgPercent')">
        <span>DMG%</span>
        <span class="main-stat" v-if="mainStats.dmgPercent > 0">({{ mainStats.dmgPercent }})</span>
      </div>
      <div class="input-placeholder"></div>
      <div class="external-bonus-container">
        <input type="number" v-model="externalBonus.dmgPercent" class="external-bonus-input" placeholder="Bonus">
      </div>
      <span class="final-value">{{ finalStats.dmgPercent }}</span>
    </div>
    <div class="formatted-stats" @click="copyToClipboard" :class="{ copied: showCopied }">
      {{ formattedStats }}
      <span class="copy-message" v-if="showCopied">Copied!</span>
    </div>
  </div>
</template>

<script>
import { useSubstatRollsStore } from '../stores/useSubstatRollsStore'

export default {
  name: 'KqmStandard',
  setup() {
    const substatRollsStore = useSubstatRollsStore()
    return { substatRollsStore }
  },
  data() {
    return {
      mainStatMultipliers: {
        hp: 4780,
        hpPercent: 46.6,
        atk: 311,
        atkPercent: 46.6,
        def: 0,
        defPercent: 58.3,
        em: 187,
        er: 51.8,
        cr: 31.1,
        cd: 62.2,
        dmgPercent: 46.6
      },
      mainStats: {
        hp: 1,
        hpPercent: 0,
        atk: 1,
        atkPercent: 0,
        def: 0,
        defPercent: 0,
        em: 0,
        er: 0,
        cr: 0,
        cd: 0,
        dmgPercent: 0
      },
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
      },
      showCopied: false
    }
  },
  methods: {
    incrementMainStat(stat) {
      this.mainStats[stat]++
    },
    decrementMainStat(stat) {
      if (this.mainStats[stat] > 0) {
        this.mainStats[stat]--
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.formattedStats)
        .then(() => {
          this.showCopied = true
          setTimeout(() => {
            this.showCopied = false
          }, 2000)
        })
    }
  },
  computed: {
    totalInputs() {
      return Object.values(this.substatRollsStore.rollCounts).reduce((sum, value) => sum + Number(value), 0)
    },
    totalMainStats() {
      return Object.values(this.mainStats).reduce((sum, value) => sum + Number(value), 0)
    },
    formattedStats() {
      const stats = {
        hp: this.finalStats.hp,
        'hp%': (this.finalStats.hpPercent / 100).toFixed(2),
        atk: this.finalStats.atk,
        'atk%': (this.finalStats.atkPercent / 100).toFixed(2),
        def: this.finalStats.def,
        'def%': (this.finalStats.defPercent / 100).toFixed(2),
        em: this.finalStats.em,
        er: (this.finalStats.er / 100).toFixed(2),
        cr: (this.finalStats.cr / 100).toFixed(2),
        cd: (this.finalStats.cd / 100).toFixed(2),
        'dmg%': (this.finalStats.dmgPercent / 100).toFixed(2)
      }
      return Object.entries(stats)
        .map(([key, value]) => `${key}=${value}`)
        .join(' ') + ';'
    },
    finalStats() {
      return {
        hp: (this.substatRollsStore.rollValues.hp * (this.substatRollsStore.rollCounts.hp + 2) + this.mainStats.hp * this.mainStatMultipliers.hp + Number(this.externalBonus.hp)).toFixed(2),
        hpPercent: (this.substatRollsStore.rollValues.hpPercent * (this.substatRollsStore.rollCounts.hpPercent + 2) + this.mainStats.hpPercent * this.mainStatMultipliers.hpPercent + Number(this.externalBonus.hpPercent)).toFixed(2),
        atk: (this.substatRollsStore.rollValues.atk * (this.substatRollsStore.rollCounts.atk + 2) + this.mainStats.atk * this.mainStatMultipliers.atk + Number(this.externalBonus.atk)).toFixed(2),
        atkPercent: (this.substatRollsStore.rollValues.atkPercent * (this.substatRollsStore.rollCounts.atkPercent + 2) + this.mainStats.atkPercent * this.mainStatMultipliers.atkPercent + Number(this.externalBonus.atkPercent)).toFixed(2),
        def: (this.substatRollsStore.rollValues.def * (this.substatRollsStore.rollCounts.def + 2) + this.mainStats.def * this.mainStatMultipliers.def + Number(this.externalBonus.def)).toFixed(2),
        defPercent: (this.substatRollsStore.rollValues.defPercent * (this.substatRollsStore.rollCounts.defPercent + 2) + this.mainStats.defPercent * this.mainStatMultipliers.defPercent + Number(this.externalBonus.defPercent)).toFixed(2),
        em: (this.substatRollsStore.rollValues.em * (this.substatRollsStore.rollCounts.em + 2) + this.mainStats.em * this.mainStatMultipliers.em + Number(this.externalBonus.em)).toFixed(2),
        er: (this.substatRollsStore.rollValues.er * (this.substatRollsStore.rollCounts.er + 2) + this.mainStats.er * this.mainStatMultipliers.er + Number(this.externalBonus.er)).toFixed(2),
        cr: (this.substatRollsStore.rollValues.cr * (this.substatRollsStore.rollCounts.cr + 2) + this.mainStats.cr * this.mainStatMultipliers.cr + Number(this.externalBonus.cr)).toFixed(2),
        cd: (this.substatRollsStore.rollValues.cd * (this.substatRollsStore.rollCounts.cd + 2) + this.mainStats.cd * this.mainStatMultipliers.cd + Number(this.externalBonus.cd)).toFixed(2),
        dmgPercent: (this.substatRollsStore.rollValues.dmgPercent * this.substatRollsStore.rollCounts.dmgPercent + this.mainStats.dmgPercent * this.mainStatMultipliers.dmgPercent + Number(this.externalBonus.dmgPercent)).toFixed(2)
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

.formatted-stats {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
}

.formatted-stats:hover {
  background-color: #e0e0e0;
}

.formatted-stats.copied {
  background-color: #4caf50;
  color: white;
}

.copy-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 4px;
  color: #4caf50;
  font-weight: bold;
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
</style>
