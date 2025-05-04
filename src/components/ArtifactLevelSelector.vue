<template>
  <div class="artifact-level-selector">
    <label>Artifact Level:</label>
    <div class="level-buttons">
      <button
        v-for="level in levels"
        :key="level"
        :class="{ active: artifactLevel === level }"
        @click="artifactLevel = level"
      >
        +{{ level }}
      </button>
    </div>
  </div>
</template>

<script>
import { useStatRollsStore } from '../stores/useStatRollsStore'

export default {
  name: 'ArtifactLevelSelector',
  setup() {
    const statRollsStore = useStatRollsStore()
    return { statRollsStore }
  },
  data() {
    return {
      levels: [0, 4, 8, 12, 16, 20]
    }
  },
  computed: {
    artifactLevel: {
      get() {
        return this.statRollsStore.artifactLevel
      },
      set(value) {
        this.statRollsStore.artifactLevel = value
      }
    }
  }
}
</script>

<style scoped>
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

.level-buttons {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #f0f0f0;
}

button.active {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
}
</style> 