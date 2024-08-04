<template>
  <div>
    说明:<br/>
    1. 上传图片, 点击图片, 获取当前点在坐标上的位置, 并且记录下来<br/>
    2. 名称自动识别数字, 自动增加(可空)<br/>
  </div>
  <div>
    <input type="file" ref="imageInputRef" accept="image/*" @change="uploadImg">
    <br/>
    <MyCanvas ref="canvasRef" :resList="resList"></MyCanvas>
    <hr/>
    <div>
      <label class="label" for="nameInput">名称:</label>
      <input type="text" ref="nameInputRef" name="nameInput" v-model="currentinputRef"/>
      <br/>
      <label class="label" for="nameNo">id:</label>
      <input type="text" ref="nameNoRef" name="nameNo" v-model="currentNoRef"/>
      <br/>
      <label class="label" for="auto-increase">自动增加:</label>
      <span>
      是&nbsp;<input type="radio" name="是" :value="true" v-model="autoIncrease">
      &nbsp;
      否&nbsp;<input type="radio" name="否" :value="false" v-model="autoIncrease">
      </span>
    </div>
    <br/>
    <ResList :resList="resList"></ResList>
  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, unref} from "vue";
import {Res} from "./components/props.ts";
import ResList from './components/ResList/ResList.vue'

const canvasRef = ref()
const imageInputRef = ref()
const resList = reactive<Res[]>([])
const currentinputRef = ref('0')
const currentNoRef = ref('')
const convasRefcanvasRef = computed(() => unref(canvasRef)?.canvasRef)
const autoIncrease = ref(false)

// 按钮,导入图片, 导入之后,放在画布上, 点击的时候, 获取当前点在坐标上的位置
function uploadImg() {
  clear()
  const canvas = unref(convasRefcanvasRef)
  const imageInput = unref(imageInputRef)
  const ctx = canvas.getContext('2d');
  let img = new Image();
  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    img = new Image();
    img.onload = () => {
      // 获取img的宽高
      const imgWidth = img.width;
      const imgHeight = img.height;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
    };
    // @ts-ignore
    img.src = event.target.result.toString()
  };
  reader.readAsDataURL(file);
}

onMounted(() => {
  const canvas = unref(convasRefcanvasRef)
  // 监听canvas点击属性
  canvas.addEventListener('click', (e: MouseEvent) => {
    const x = e.offsetX;
    const y = e.offsetY;
    // 获取convas的长和宽
    const width = canvas.width;
    const height = canvas.height;
    const name = unref(currentinputRef)
    const obj: Res = {
      name,
      x: x / width,
      y: y / height,
      id: unref(currentNoRef) || undefined
    }
    resList.push(obj)
    if (autoIncrease.value) {
      increace()
    }
  });
})

function increace() {
  const name = unref(currentinputRef) || '0'
  const num = extractNumber(name)
  currentinputRef.value = name.replace(num, String(Number(num) + 1))
}

/**
 * 清空数据和图片
 */
function clear() {
  const canvas = unref(convasRefcanvasRef)
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resList.splice(0, resList.length)
  currentinputRef.value = ''
  currentNoRef.value = ''
}

/**
 * 提取数字
 */
function extractNumber(str: string) {
  const reg = /\d+/g
  const result = str.match(reg)
  return result ? result[0] : '0'
}
</script>

<style scoped>
.label {
  width: 100px;
}
</style>