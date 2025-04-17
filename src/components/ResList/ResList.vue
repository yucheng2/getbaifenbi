<template>
  <div>
    <BTableSimple>
      <thead>
      <tr>
        <th>名称</th>
        <th>坐标</th>
        <th>id</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,idx) in resList" :key="idx">
        <td>{{ item.name }}</td>
        <td>{{ item.x }}:{{ item.y }}</td>
        <td>
          <td>{{ item.id }}</td>
        </td>
        <td>
          <BButton  @click="handleRemove(item)">
            删除
          </BButton>
        </td>
      </tr>
      </tbody>
    </BTableSimple>
    <button @click="exportObj">导出</button>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { exportExcel } from "../../utils/excel.ts";
import { Res } from "../props.ts";

const props = defineProps<{
  modelValue: Res[]
}>()
const emit=  defineEmits(['update:modelValue',  'remove'])
const resList= useVModel(props, 'modelValue', emit)
function exportObj() {
  exportExcel(resList.value, 'res')
}
const handleRemove =(row:Res)=>{
  // 删除
  resList.value = resList.value.filter(item => JSON.stringify(item) !== JSON.stringify(row))
  emit('remove',row)
  
}
</script>

<style scoped>

</style>