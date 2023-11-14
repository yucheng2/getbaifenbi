<template>
  <canvas v-bind="$attrs" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">

import {ref, watchEffect} from "vue";
import {Res} from "../props.ts";
import {isEmpty} from 'lodash-es'
import PointImg from '../../assets/point.png'

const props = defineProps<{
  resList: Res[]
}>()
const canvasRef = ref()

// 根据百分比, 在canvas上画点
function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, color: string = 'red') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// 根据百分比, 在canvas上画点, 点是图片
function drawPoint2(ctx: CanvasRenderingContext2D, x: number, y: number, size: number = 40) {
  const image = new Image()
  image.src = PointImg
  image.width = size * 3 / 4;
  image.height = size;
  image.onload = () => {
    ctx.drawImage(image, x - image.width / 2, y - image.height / 2, image.width, image.height);
  }
}

watchEffect(() => {
  // 根据resList, 在canvas上画点
  const canvas = canvasRef.value
  if (!canvas || !props.resList || isEmpty(props.resList)) return
  const ctx = canvas.getContext('2d');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  props.resList?.forEach(item => {
    // drawPoint(ctx, item.x * canvas.width, item.y * canvas.height)
    drawPoint2(ctx, item.x * canvas.width, item.y * canvas.height)
  })
})
defineExpose({
  canvasRef
})

</script>

<style scoped>

</style>