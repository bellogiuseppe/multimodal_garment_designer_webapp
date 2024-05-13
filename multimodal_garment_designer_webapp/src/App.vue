<template>
    <div id="app">
      <SelectorPanel :models="models" :selectedIndex="selectedIndex" @select-model="selectModel" />
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
        selectedIndex: 0 // Indice iniziale della modella selezionata
      };
    },
    methods: {
      selectModel(index) {
        this.selectedIndex = index;
      }
    }
  };
  </script>
  