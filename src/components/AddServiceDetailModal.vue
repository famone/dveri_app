<template>
  <v-dialog v-model="addServiceDialog" width="450" height="150" persistent>
    <slot :name="addServiceSlotName"></slot>
  </v-dialog>
</template>

<script>
export default {
  props: ["changeAddServiceDialog", "addServiceDialog", "addServiceSlotName"],
};
</script>