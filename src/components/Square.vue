<template>
  <div
    :class='{
      square: true,
      blue: blue(id),
      gray: gray(id),
      blank: isBlank,
      one: height == 1
    }'
    @click='onClick(id)'
    :disabled='playerID !== currentPlayer'
  >{{ height }}</div>
</template>

<script>
export default {
  name: 'Square',
  props: ['height', 'placeHandler', 'selectHandler', 'moveHandler', 'buildHandler', 'currentPhase', 'playerID', 'currentPlayer', 'blue', 'gray', 'id'],
  computed: {
    isBlank: function () {
      if (this.height == 0) {
        return true
      }
      return false
    },
    onClick: function () {
      if (this.currentPhase === 'Place') {
        return this.placeHandler
      }
      else if (this.currentPhase === 'Select') {
        return this.selectHandler
      }
      else if (this.currentPhase === 'Move') {
        return this.moveHandler
      }
      else if (this.currentPhase === 'Build') {
        return this.buildHandler
      }
      else {
        return (() => {})
      }
    }
  }
}
</script>

<style lang="css" scoped>
.square {
  height: 100px;
  width: 100px;
  border: 1px solid black;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-family: "Staatliches", Times, serif;
  font-size: 12px;
  cursor: pointer;
  color: black;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2);
  background-color: #C0FFCD;
}

.blue {
  background-color: #6AD6FF;
}

.gray {
  background-color: #CFCFCF;
}

.blank {
  color: transparent;
}
</style>
