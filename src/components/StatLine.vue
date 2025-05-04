<template>
  <div class="input-group">
    <div class="stat-label" 
         @click.left="incrementMainStat" 
         @click.right.prevent="decrementMainStat"
         :class="{ 'has-main-stat': hasMainStat }">
      <span>{{ label }}</span>
      <span class="main-stat" v-if="mainStatValue > 0">({{ mainStatValue }})</span>
    </div>
    <div class="input-container">
      <template v-if="showInput">
        <button class="control-button" @click="decrementRollCount">-</button>
        <input type="number" v-model="rollCount" readonly>
        <button class="control-button" @click="incrementRollCount">+</button>
      </template>
      <span v-else class="placeholder"></span>
    </div>
    <span class="final-value">{{ finalValue }}</span>
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'

export default {
  name: 'StatLine',
  props: {
    label: {
      type: String,
      required: true
    },
    statKey: {
      type: String,
      required: true
    },
    showInput: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  computed: {
    rollCount: {
      get() {
        return this.statRollsStore.rollCounts[this.statKey]
      },
      set(value) {
        this.statRollsStore.rollCounts[this.statKey] = value
      }
    },
    mainStatValue() {
      return this.statRollsStore.activeMainStats[this.statKey] || 0
    },
    hasMainStat() {
      return this.mainStatValue > 0
    },
    finalValue() {
      return this.statRollsStore.getStatValue(this.statKey).toFixed(2)
    }
  },
  methods: {
    incrementMainStat() {
      this.statRollsStore.incrementMainStat(this.statKey)
    },
    decrementMainStat() {
      this.statRollsStore.decrementMainStat(this.statKey)
    },
    incrementRollCount() {
      this.rollCount = (this.rollCount || 0) + 1
    },
    decrementRollCount() {
      if (this.rollCount > 2) {
        this.rollCount = this.rollCount - 1
      }
    }
  }
}
</script>

<style scoped>
.input-group {
  display: grid;
  grid-template-columns: 80px 120px 80px;
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

.input-container {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 120px;
}

.placeholder {
  display: inline-block;
  width: 40px;
}

input {
  width: 40px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  background-color: #f8f8f8;
}

.control-button {
  width: 24px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0;
}

.control-button:hover {
  background-color: #e0e0e0;
}

.final-value {
  text-align: right;
  color: #666;
  min-width: 80px;
}
</style> 