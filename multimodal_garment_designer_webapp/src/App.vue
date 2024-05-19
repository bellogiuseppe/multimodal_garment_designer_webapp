<template>
  <div id="app">
    <SelectorPanel :models="models" :selectedIndex="selectedIndex" @select-model="selectModel" />
    <div class="controls">
      <button @click="activateDrawing">Draw</button>
      <button @click="activateEraser">Eraser</button>
      <input type="range" min="1" max="10" v-model="lineWidth">
    </div>
    <div class="drawing-container">
      <canvas
        ref="drawingCanvas"
        width="800"
        height="600"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        style="border: 1px solid black;"
      ></canvas>
      <div v-show="showCursor" class="cursor" :style="cursorStyle"></div>
    </div>
  </div>
</template>

  
  <script>
  import SelectorPanel from './components/SelectorPanel.vue';
  
  export default {
    components: {
      SelectorPanel
    },
    data() {
      return {
        models: [
          { name: 'Model 1', image: '../assets/model1.jpg' },
          { name: 'Model 2', image: '../assets/model2.jpg' },
          // Aggiungi altri oggetti se necessario
        ],
        selectedIndex: 0, // Indice iniziale della modella selezionata
        isDrawing: false,
        context: null,
        isEraserActive: false,
        lineWidth: 2,
        cursorX: 0,
        cursorY: 0
      };
    },

    computed: {
      cursorStyle() {
        return {
          width: this.lineWidth + 'px',
          height: this.lineWidth + 'px',
          top: (this.cursorY - this.lineWidth / 2) + 'px',
          left: (this.cursorX - this.lineWidth / 2) + 'px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 0, 0, 1)',
          backgroundColor: this.isEraserActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 0, 0, 1)',
          pointerEvents: 'none',
          position: 'absolute',
        };
      }
    },

    methods: {
      selectModel(index) {
        this.selectedIndex = index;
      },
      startDrawing(event) {
        this.isDrawing = true;
        this.context = this.$refs.drawingCanvas.getContext('2d');
        this.context.strokeStyle = this.isEraserActive ? 'white' : 'black';
        this.context.lineWidth = 2;
        this.context.lineWidth = this.lineWidth;
        this.context.beginPath();
        this.context.moveTo(event.offsetX, event.offsetY);
      },
      draw(event) {
        if (!this.isDrawing) return;
        this.context.lineTo(event.offsetX, event.offsetY);
        this.context.stroke();
      },
      stopDrawing() {
        this.isDrawing = false;
        this.context.closePath();
      },
      activateDrawing() {
        this.isEraserActive = false;
      },
      activateEraser() {
        this.isEraserActive = true;
      },
      updateCursor(event) {
        this.showCursor = true;
        this.cursorX = event.offsetX;
        this.cursorY = event.offsetY;
      },
      hideCursor() {
        this.showCursor = false;
      }
    },
    mounted() {
      this.context = this.$refs.drawingCanvas.getContext('2d');
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.$refs.drawingCanvas.width, this.$refs.drawingCanvas.height);
    }
  };
  </script>

<style>
#app {
  text-align: center;
  margin-top: 20px;
}

.controls {
  margin-top: 10px;
}

.drawing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

canvas {
  border: 1px solid black;
  background-color: white;
}
</style>

  