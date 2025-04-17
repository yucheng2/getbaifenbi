<template>
  <canvas v-bind="$attrs" ref="canvasRef"></canvas>
</template>

<script setup lang="ts">

import {nextTick, ref, watchEffect} from "vue";
import {Res} from "../props.ts";
import {isEmpty} from 'lodash-es'
import PointImg from '../../assets/point.png'

const props = defineProps<{
  resList: Res[],
  image: Image
}>()
const canvasRef = ref()

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

/**
 * 初始化 图片
 */
function initImage() {
  const img  = props.image
  if(!img) return
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d');
  const imgWidth = img.width;
      const imgHeight = img.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
}

 const reDraw = async () => {
  await nextTick()
  // 根据resList, 在canvas上画点
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initImage()
  props.resList?.forEach(item => {
    // drawPoint(ctx, item.x * canvas.width, item.y * canvas.height)
    drawPoint2(ctx, item.x * canvas.width, item.y * canvas.height)
  })
}

defineExpose({
  canvasRef,
  reDraw
})

</script>

<style scoped>

</style>