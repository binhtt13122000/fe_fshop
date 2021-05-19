<template>
  <div>
    <v-card>
      <v-card-title class="headline blue lighten-1 pa-2 d-flex justify-center">
        {{ title }}
      </v-card-title>
      <v-container>
        <v-col cols="12">
          <v-text-field
            :type="type"
            :label="label"
            :value="value"
            :rules="rules"
            @input="inputTest($event)"
            :error-messages="errorMessage"
          ></v-text-field>
        </v-col>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="cancelDialog()">Cancel</v-btn>
        <v-btn text @click="acceptDialog()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DiaCreate",
  props: ["title", "label", "type", "value", "errorMessage", "accept", "rules"],
  methods: {
    inputTest(value) {
      this.$emit("input", value);
    },
    cancelDialog() {
      this.$emit("cancel");
    },
    acceptDialog() {
      this.$emit("accept");
    },
  },
  created() {
    console.log(this.type);
  },
};
</script>

<style>
</style>