<template>
  <div>
    <v-card>
      <v-card-title
        class="headline blue lighten-1 pa-2 d-flex justify-center"
        >{{ title }}</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue lighten-1" @click="$emit('cancel')" text
          >Cancel</v-btn
        >
        <v-btn color="blue lighten-1" @click="$emit('accept')" text>OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "DiaConfirm",
  props: ["title"],
};
</script>

<style>
</style>