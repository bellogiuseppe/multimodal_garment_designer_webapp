<!-- SelectorPanel.vue -->
<template>
    <div class="selector-panel">
      <div class="initial-selector" @click="togglePanel">
        <div class="selected-model-preview">
            <img :src="models[selectedIndex].image" :alt="models[selectedIndex].name" />
            <span>{{ models[selectedIndex].name }}</span>
        </div>
      </div>
      <div class="models-panel" v-if="showSelector">
        <div class="scroll-button left" @click="scrollLeft">&#10094;</div>
        <div class="scroll-container">
          <div class="models-wrapper">
            <div v-for="(model, index) in models" :key="index" class="model-item" @click="selectModel(index)">
              <div class="image-container">
                <img :src="model.image" :alt="model.name" />
              </div>
              <p>{{ model.name }}</p>
            </div>
          </div>
        </div>
        <div class="scroll-button right" @click="scrollRight">&#10095;</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      models: Array, // Array di modelli con attributi name e image
      selectedIndex: Number // Indice della modella selezionata
    },
    data() {
      return {
        showSelector: false,
        scrollPosition: 0
      };
    },
    methods: {
      togglePanel() {
        this.showSelector = !this.showSelector;
      },
      selectModel(index) {
        this.$emit('select-model', index);
        this.showSelector = false; // Chiudi il selettore dopo la selezione
      },
      scrollLeft() {
        if (this.scrollPosition > 0) {
          this.scrollPosition -= 1;
        }
      },
      scrollRight() {
        if (this.scrollPosition < this.models.length - 1) {
          this.scrollPosition += 1;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stili CSS per il componente */
.selector-panel {
    position: fixed; /* Posizionamento fisso rispetto alla finestra del browser */
    top: 0; /* Posizionamento in alto rispetto alla finestra del browser */
    left: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 999; /* Assicura che il pannello sia sopra gli altri contenuti */
}

.initial-selector {
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 50%;
  right: 0;
  transform: translateY(-50%);
}

.selected-model-preview {
  display: flex;
  align-items: center;
  height: 10%;
}

.selected-model-preview img {
  width: 10%; /* Dimensione dell'anteprima dell'immagine */
  height: 100%; /* Dimensione dell'anteprima dell'immagine */
  object-fit: contain; /* Riempimento completo */
  margin-right: 10px; /* Spazio tra l'immagine e il testo */
}
  
  .models-panel {
    width: calc(100% - 20px); /* Larghezza massima del pannello orizzontale */
    margin: 0 auto; /* Centra il pannello */
    background-color: #f9f9f9; /* Colore di sfondo del pannello orizzontale */
    border: 1px solid #ccc; /* Bordo sottile */
    border-radius: 4px; /* Bordi arrotondati */
    overflow: hidden;
    position: relative;
    margin-top:2%
  }
  
  .scroll-button {
    font-size: 24px;
    cursor: pointer;
    color: #333; /* Colore del testo */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .left {
    left: 10px;
  }
  
  .right {
    right: 10px;
  }
  
  .scroll-container {
    overflow-x: auto;
    padding: 10px; /* Spazio interno al pannello orizzontale */
  }
  
  .models-wrapper {
    display: flex;
  }
  
  .model-item {
    margin: 0 10px; /* Margine tra le immagini */
    text-align: center;
    width: 20%; /* Larghezza del singolo elemento */
  }
  
  .image-container {
    width: 100%; /* Assicura che l'immagine abbia la larghezza del container */
    padding-bottom: 100%; /* Altezza dell'immagine uguale alla larghezza */
    position: relative; /* Posizionamento relativo per l'elemento figlio */
    overflow: hidden; /* Nascondi eventuali contenuti oltre il bordo */
  }
  
  .image-container img {
    position: absolute; /* Posizionamento assoluto per centrare l'immagine */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%; /* Larghezza dell'immagine pari al 100% del container */
    height: 100%; /* Altezza dell'immagine pari al 100% del container */
    object-fit: cover; /* Riempimento completo dell'immagine */
  }
  </style>
  