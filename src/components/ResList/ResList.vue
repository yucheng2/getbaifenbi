<template>
  <div>
    <BTableSimple>
      <thead>
      <tr>
        <th>名称</th>
        <th>坐标</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in resList" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.x }}:{{ item.y }}</td>
        <td>
          <td>{{ item.id }}</td>
        </td>
      </tr>
      </tbody>
    </BTableSimple>
    <button @click="exportObj">导出</button>
  </div>
</template>

<script setup lang="ts">
import {Res} from "../props.ts";
import {exportExcel} from "../../utils/excel.ts";

const props = defineProps<{
  resList: Res[]
}>()

function exportObj() {
  exportExcel(props.resList, 'res')
  console.log(props.resList)
}
</script>

<style scoped>

</style>