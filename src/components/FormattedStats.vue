<template>
  <div class="formatted-stats" @click="copyToClipboard">
    <div class="stats-text">{{ formattedStats }}</div>
    <div class="copy-hint" v-if="showCopyHint">Copied to clipboard!</div>
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'

export default {
  name: 'FormattedStats',
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  data() {
    return {
      showCopyHint: false
    }
  },
  computed: {
    formattedStats() {
      const stats = [
        `hp=${this.getFormattedValue('hp')}`,
        `hp%=${this.getFormattedValue('hpPercent')}`,
        `atk=${this.getFormattedValue('atk')}`,
        `atk%=${this.getFormattedValue('atkPercent')}`,
        `def=${this.getFormattedValue('def')}`,
        `def%=${this.getFormattedValue('defPercent')}`,
        `em=${this.getFormattedValue('em')}`,
        `er=${this.getFormattedValue('er')}`,
        `cr=${this.getFormattedValue('cr')}`,
        `cd=${this.getFormattedValue('cd')}`,
        `dmg%=${this.getFormattedValue('dmgPercent')}`
      ]
      return `add stats ${stats.join(' ')};`
    }
  },
  methods: {
    getFormattedValue(stat) {
      return Number(this.statRollsStore.getStatValue(stat)).toFixed(2)
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.formattedStats)
      this.showCopyHint = true
      setTimeout(() => {
        this.showCopyHint = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.formatted-stats {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.stats-text {
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  min-height: 100px;
}

.copy-hint {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
</style> 