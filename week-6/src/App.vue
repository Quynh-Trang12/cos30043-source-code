<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Week 6: Forms and Validation</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="html5">HTML5 Validation</v-tab>
          <v-tab value="vue">VueJS Validation</v-tab>
          <v-tab value="vuetify">Vuetify Forms</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="html5">
            <HTML5Validation />
          </v-window-item>

          <v-window-item value="vue">
            <VueValidation />
          </v-window-item>

          <v-window-item value="vuetify">
            <VuetifyForms />
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HTML5Validation from "./components/HTML5Validation.vue";
import VueValidation from "./components/VueValidation.vue";
import VuetifyForms from "./components/VuetifyForms.vue";

export default {
  name: "App",
  components: {
    HTML5Validation,
    VueValidation,
    VuetifyForms,
  },
  data() {
    return {
      tab: "html5",
    };
  },
};
</script>
