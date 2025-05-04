<template>
  <div class="stats-item" :class="{ success: isRatioIdeal }">
    <div class="stats-row">
      <div class="extra-inputs">
        <div class="extra-input-group">
          <label>+CR</label>
          <input type="number" v-model="extraCr" class="extra-input" placeholder="0">
        </div>
        <div class="extra-input-group">
          <label>+CD</label>
          <input type="number" v-model="extraCd" class="extra-input" placeholder="0">
        </div>
      </div>
      <div class="ratio-display">
        <div class="stats-title">Crit Ratio</div>
        <div class="stats-value">{{ critRatio.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'

export default {
  name: 'CritRatio',
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  data() {
    return {
      extraCr: 0,
      extraCd: 0
    }
  },
  computed: {
    critRatio() {
      const cr = this.statRollsStore.getStatValue('cr') + Number(this.extraCr)
      const cd = this.statRollsStore.getStatValue('cd') + Number(this.extraCd)
      return cd / cr
    },
    isRatioIdeal() {
      return Math.abs(this.critRatio - 2) < 0.1
    }
  }
}
</script>

<style scoped>
.stats-item {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  background-color: white;
}

.stats-item.success {
  background-color: #4caf50;
  color: white;
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.extra-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.extra-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.extra-input-group label {
  font-size: 0.9em;
  min-width: 30px;
}

.extra-input {
  width: 30px;
  padding: 2px;
  border: none;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 0.9em;
  background: transparent;
}

.extra-input:focus {
  outline: none;
  border-bottom-color: #2196f3;
}

.stats-item.success .extra-input {
  border-bottom-color: rgba(255, 255, 255, 0.5);
  color: white;
}

.stats-item.success .extra-input:focus {
  border-bottom-color: white;
}

.stats-item.success .extra-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.ratio-display {
  flex: 1;
  text-align: center;
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
</style> 