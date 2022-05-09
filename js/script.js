/**
 * Création des localStorage selon les tableaux
 */
const STORAGE_KEY_FAIRE = "todoStorageFaire";
const STORAGE_KEY_COURS = "todoStorageCours";
const STORAGE_KEY_TERMINE = "todoStorageTermine";
/**
 * Création du composant racine
 */
const RootComponent = {
  /**
   * Création des data properties
   */
  data() {
    return {
      button: "faire",
      task: "",
      faire: [],
      cours: [],
      termine: [],
      taskStatut: "",
    };
  },
  /**
   * Affichage du localStorage s'il y a
   */

  created() {
    this.faire = JSON.parse(localStorage.getItem(STORAGE_KEY_FAIRE) || "[]");
    this.cours = JSON.parse(localStorage.getItem(STORAGE_KEY_COURS) || "[]");
    this.termine = JSON.parse(
      localStorage.getItem(STORAGE_KEY_TERMINE) || "[]"
    );
  },

  methods: {
    /**
     *  Changer de tableau selon l'onglet de navigation choisi
     */
    changeButtonValue(e) {
      this.button = e.target.value;
    },
    /**
     *  Ecouter la valeur de l'input et entrer cette valeur dans la data task
     */
    editTask(e) {
      this.task = e.target.value;
    },
    /**
     *  Push la data task dans le tableau des tâches à faire
     */
    addNewTask() {
      this.faire.push(this.task);
      this.task = "";
      localStorage.setItem(STORAGE_KEY_FAIRE, JSON.stringify(this.faire));
    },
    /**
     * Supprimer une tache selon le tableau et le local storage correspondant
     */
    deleteTaskFaire(e) {
      let index = e.target.dataset.index;
      this.faire.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_FAIRE, JSON.stringify(this.faire));
    },
    deleteTaskCours(e) {
      let index = e.target.dataset.index;
      this.cours.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_COURS, JSON.stringify(this.cours));
    },
    deleteTaskTermine(e) {
      let index = e.target.dataset.index;
      this.termine.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_TERMINE, JSON.stringify(this.termine));
    },
    /**
     * changer le statut d'une tache et MAJ du local storage correspondant
     */
    addStatutCours(e) {
      this.taskStatut = e.target.value;
      let index = e.target.dataset.index;
      this.cours.push(this.faire[index]);
      this.faire.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_COURS, JSON.stringify(this.cours));
      localStorage.setItem(STORAGE_KEY_FAIRE, JSON.stringify(this.faire));
    },
    addStatutTermine(e) {
      this.taskStatut = e.target.value;
      let index = e.target.dataset.index;
      this.termine.push(this.cours[index]);
      this.cours.splice(index, 1);
      localStorage.setItem(STORAGE_KEY_TERMINE, JSON.stringify(this.termine));
      localStorage.setItem(STORAGE_KEY_COURS, JSON.stringify(this.cours));
    },
  },
};

/**
 * Création et montage de l'app
 */

Vue.createApp(RootComponent).mount("#root");
