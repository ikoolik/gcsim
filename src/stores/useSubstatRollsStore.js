import { defineStore } from 'pinia'

export const useSubstatRollsStore = defineStore('substatRolls', {
  state: () => ({
    rollCounts: {
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
    }
  }),
  getters: {
    totalRolls: (state) => {
      return Object.values(state.rollCounts).reduce((sum, value) => sum + Number(value), 0)
    }
  },
  actions: {
    setSubstatRollCount(stat, value) {
      this.rollCounts[stat] = value
    }
  }
}) 