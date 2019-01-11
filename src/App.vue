<template>
  <div id="app">
    <h4>current phase: {{ currentPhase }}</h4>
    <h4>current player: {{ currentPlayer }}</h4>
    <div class="board">
      <Square
        v-for='(element, index) in heights'
        :height='element'
        :id='index'
        :key='index'
        :placeHandler='placeBuilder'
        :selectHandler='selectBuilder'
        :moveHandler='moveBuilder'
        :buildHandler='buildStructure'
        :currentPhase='currentPhase'
        :blue='blueOccupy'
        :gray='grayOccupy'
      />
    </div>
  </div>
</template>

<script>
import Square from './components/Square.vue'

export default {
  name: 'app',
  components: {
    Square
  },
  data: function () {
    return {
      heights: Array(25).fill(0),
      adjacentTo: [
        [1, 5, 6],           // 0
        [0, 2, 5, 6, 7],        // 1
        [1, 3, 6, 7, 8],        // 2
        [2, 4, 7, 8, 9],        // 3
        [3, 8, 9],           // 4
        [0, 1, 6, 10, 11],       // 5
        [0, 1, 2, 5, 7, 10, 11, 12],    // 6
        [1, 2, 3, 6, 8, 11, 12, 13],    // 7
        [2, 3, 4, 7, 9, 12, 13, 14],    // 8
        [3, 4, 8, 13, 14],       // 9
        [5, 6, 11, 15, 16],      // 10
        [5, 6, 7, 10, 12, 15, 16, 17],  // 11
        [6, 7, 8, 11, 13, 16, 17, 18],  // 12
        [7, 8, 9, 12, 14, 17, 18, 19],  // 13
        [8, 9, 13, 18, 19],      // 14
        [10, 11, 16, 20, 21],     // 15
        [10, 11, 12, 15, 17, 20, 21, 22], // 16
        [11, 12, 13, 16, 18, 21, 22, 23], // 17
        [12, 13, 14, 17, 19, 22, 23, 24], // 18
        [13, 14, 18, 23, 24],     // 19
        [15, 16, 21],         // 20
        [15, 16, 17, 20, 22],     // 21
        [16, 17, 18, 21, 23],     // 22
        [17, 18, 19, 22, 24],     // 23
        [18, 19, 23]          // 24
      ],
      p1b1: -1,
      p1b2: -1,
      p2b1: -1,
      p2b2: -1,
      selectedBuilder: -6,
      currentPhase: 'Place',
      currentPlayer: 'Blue',
      playerID: 'Blue',
      winner: ''
    }
  },
  methods: {
    hasLegalMove: function (currentPlayer) {
      const temp = this.selectedBuilder;
      if (currentPlayer === 'Blue') {
        this.selectedBuilder = this.p1b1
        for (let i = 0; i < this.adjacentTo[this.p1b1].length; i++) {
          if (this.isValidMove(this.adjacentTo[this.p1b1][i])) {
            this.selectedBuilder = temp
            return true
          }
        }
        this.selectedBuilder = this.p1b2
        for (let i = 0; i < this.adjacentTo[this.p1b2].length; i++) {
          if (this.isValidMove(this.adjacentTo[this.p1b2][i])) {
            this.selectedBuilder = temp
            return true
          }
        }
        this.selectedBuilder = temp
        return false
      }
      else {
        this.selectedBuilder = this.p2b1
        for (let i = 0; i < this.adjacentTo[this.p2b1].length; i++) {
          if (this.isValidMove(this.adjacentTo[this.p2b1][i])) {
            this.selectedBuilder = temp
            return true
          }
        }
        this.selectedBuilder = this.p2b2
        for (let i = 0; i < this.adjacentTo[this.p2b2].length; i++) {
          if (this.isValidMove(this.adjacentTo[this.p2b2][i])) {
            this.selectedBuilder = temp
            return true
          }
        }
        this.selectedBuilder = temp
        return false
      }
    },
    blueOccupy: function (square) {
      if (this.p1b1 == square || this.p1b2 == square) {
        return true
      }
      return false
    },
    grayOccupy: function (square) {
      if (this.p2b1 == square || this.p2b2 == square) {
        return true
      }
      return false
    },
    isOccupied: function (square) {
      if (square == this.p1b1) {
        return true
      }
      else if (square == this.p1b2) {
        return true
      }
      else if (square == this.p2b1) {
        return true
      }
      else if (square == this.p2b2) {
        return true
      }
      return false
    },
    isValidMove: function (square) {
      if (!this.adjacentTo[this.selectedBuilder].includes(square)) {
        return false
      }
      if (this.isOccupied(square)) {
        return false
      }
      if (this.heights[square] == 4) {
        return false
      }
      else if ((this.heights[square]-this.heights[this.selectedBuilder]) >= 2) {
        return false
      }
      return true
    },
    placeBuilder: function (square) {
      if (this.p1b1 == -1 && !this.isOccupied(square)) {
        this.p1b1 = square
      }
      else if (this.p1b1 > -1 && this.p1b2 == -1 && !this.isOccupied(square)) {
        this.p1b2 = square
        this.currentPlayer = 'Gray'
      }
      else if (this.p1b2 > -1 && this.p2b1 == -1 && !this.isOccupied(square)) {
        this.p2b1 = square
      }
      else if (this.p2b1 > -1 && this.p2b2 == -1 && !this.isOccupied(square)) {
        this.p2b2 = square
        this.currentPlayer = 'Blue'
        this.currentPhase = 'Select'
      }
    },
    selectBuilder: function (square) {
      if (square == this.p1b1 && this.playerID === 'Blue') {
        this.selectedBuilder = this.p1b1
      }
      else if (square == this.p1b2 && this.playerID === 'Blue') {
        this.selectedBuilder = this.p1b2
      }
      else if (square == this.p2b1 && this.playerID === 'Gray') {
        this.selectedBuilder = this.p2b1
      }
      else if (square == this.p2b2 && this.playerID === 'Gray') {
        this.selectedBuilder = this.p2b2
      }
      else {
        return
      }
      this.currentPhase = 'Move'
    },
    moveBuilder: function (square) {
      if (this.isValidMove(square)) {
        if (this.selectedBuilder == this.p1b1) {
          this.p1b1 = square
        }
        else if (this.selectedBuilder == this.p1b2) {
          this.p1b2 = square
        }
        else if (this.selectedBuilder == this.p2b1) {
          this.p2b1 = square
        }
        else if (this.selectedBuilder == this.p2b2) {
          this.p2b2 = square
        }
        this.selectedBuilder = square
        this.currentPhase = 'Build'
      }
      else if (this.selectedBuilder == square) {
        this.selectedBuilder = -6
        this.currentPhase = 'Select'
      }
    },
    buildStructure: function (square) {
      if (!this.adjacentTo[this.selectedBuilder].includes(square)) {
        return
      }
      if (this.isOccupied(square)) {
        return
      }
      if (this.heights[square] == 4) {
        return
      }
      this.heights.splice(square, 1, this.heights[square] + 1)
      this.selectedBuilder = -6
      this.currentPhase = 'Select'
      this.currentPlayer = (this.currentPlayer === 'Blue' ? 'Gray' : 'Blue')
      this.playerID = this.currentPlayer
      if (!this.hasLegalMove(this.currentPlayer)) {
        this.currentPhase = 'End'
        return
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.board {
  display: grid;
  justify-content: center;
  grid-template-columns: 114px 114px 114px 114px 114px;
}
</style>
