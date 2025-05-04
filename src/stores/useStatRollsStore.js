import { defineStore } from 'pinia'

export const useStatRollsStore = defineStore('statRolls', {
  state: () => ({
    artifactLevel: 20,
    activeMainStats: {
      hp: 1,
      hpPercent: 0,
      atk: 1,
      atkPercent: 0,
      defPercent: 0,
      em: 0,
      er: 0,
      cr: 0,
      cd: 0,
      dmgPercent: 0
    },
    rollCounts: {
      hp: 2,
      hpPercent: 2,
      atk: 2,
      atkPercent: 2,
      def: 2,
      defPercent: 2,
      em: 2,
      er: 2,
      cr: 2,
      cd: 2,
      dmgPercent: 0
    },
    rollValues: {
      hp: 253.94,
      hpPercent: 4.96,
      atk: 16.54,
      atkPercent: 4.96,
      def: 19.68,
      defPercent: 6.2,
      em: 19.82,
      er: 5.51,
      cr: 3.31,
      cd: 6.62,
      dmgPercent: 0
    },
    mainStatBase: {
      hp: 717,
      hpPercent: 7.0,
      atk: 47,
      atkPercent: 7.0,
      defPercent: 8.7,
      em: 28.0,
      er: 7.8,
      cr: 4.7,
      cd: 9.3,
      dmgPercent: 7.0
    },
    mainStatRollValues: {
      hp: 203.15,
      hpPercent: 1.98,
      atk: 13.2,
      atkPercent: 1.98,
      defPercent: 2.48,
      em: 7.925,
      er: 2.2,
      cr: 1.32,
      cd: 2.645,
      dmgPercent: 1.98
    }
  }),
  getters: {
    totalRolls: (state) => {
      return Object.values(state.rollCounts).reduce((sum, value) => sum + Number(value), 0)
    },
    totalMainStats: (state) => {
      return Object.values(state.activeMainStats).reduce((sum, value) => sum + Number(value), 0)
    },
    getMainstatValue: (state) => (stat) => {
      if (!(stat in state.activeMainStats) || !(stat in state.mainStatBase) || !(stat in state.mainStatRollValues)) {
        return 0
      }
      return state.activeMainStats[stat] * (state.mainStatBase[stat] + (state.artifactLevel * state.mainStatRollValues[stat]))
    },
    getSubstatValue: (state) => (stat) => {
      return state.rollValues[stat] * state.rollCounts[stat]
    },
    getStatValue: (state) => (stat) => {
      return state.getSubstatValue(stat) + state.getMainstatValue(stat)
    },
    mainStatMultipliers: (state) => {
      return {
        hp: state.mainStatBase.hp + (state.artifactLevel * state.mainStatRollValues.hp),
        hpPercent: state.mainStatBase.hpPercent + (state.artifactLevel * state.mainStatRollValues.hpPercent),
        atk: state.mainStatBase.atk + (state.artifactLevel * state.mainStatRollValues.atk),
        atkPercent: state.mainStatBase.atkPercent + (state.artifactLevel * state.mainStatRollValues.atkPercent),
        defPercent: state.mainStatBase.defPercent + (state.artifactLevel * state.mainStatRollValues.defPercent),
        em: state.mainStatBase.em + (state.artifactLevel * state.mainStatRollValues.em),
        er: state.mainStatBase.er + (state.artifactLevel * state.mainStatRollValues.er),
        cr: state.mainStatBase.cr + (state.artifactLevel * state.mainStatRollValues.cr),
        cd: state.mainStatBase.cd + (state.artifactLevel * state.mainStatRollValues.cd),
        dmgPercent: state.mainStatBase.dmgPercent + (state.artifactLevel * state.mainStatRollValues.dmgPercent)
      }
    }
  },
  actions: {
    setSubstatRollCount(stat, value) {
      this.rollCounts[stat] = value
    },
    incrementMainStat(stat) {
      this.activeMainStats[stat]++
    },
    decrementMainStat(stat) {
      if (this.activeMainStats[stat] > 0) {
        this.activeMainStats[stat]--
      }
    }
  }
}) 