<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :item-key="itemKey"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "TableNoAction",
  props: ["headers", "items", "itemKey", "title"],
};
</script>

<style>
</style>