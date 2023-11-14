<template>
  <div>
    <!--  画布-->
    <MyCanvas ref="canvasRef" :resList="resList"></MyCanvas>
    <hr/>
    <!--  按钮,导入图片, 导入之后,放在画布上, 点击的时候, 获取当前点在坐标上的位置, -->
    <button @click="uploadImg">上传图片</button>
    <hr/>
    <input type="file" ref="imageInputRef" accept="image/*">
    <br/>
    <label for="nameInput">nameInput</label>
    <input type="text" ref="nameInputRef" name="nameInput" v-model="currentinputRef"/>
    <br/>
    <label for="nameNo">nameNo</label>
    <input type="text" ref="nameNoRef" name="nameNo" v-model="currentNoRef"/>
    <br/>


    <ResList :resList="resList"></ResList>
  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, unref, watchEffect} from "vue";
import {Res} from "./components/props.ts";
import ResList from './components/ResList/ResList.vue'

const canvasRef = ref()
const imageInputRef = ref()
const resList = reactive<Res[]>([])
const currentinputRef = ref('')
const currentNoRef = ref('')
const convasRefcanvasRef= computed(()=> unref(canvasRef)?.canvasRef)


// 按钮,导入图片, 导入之后,放在画布上, 点击的时候, 获取当前点在坐标上的位置
function uploadImg() {
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
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

onMounted(() => {
  const canvas = unref(convasRefcanvasRef)
  // 监听canvas点击属性
  canvas.addEventListener('click', (e) => {
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
    increace()
  });
})

function increace() {
  const name = unref(currentinputRef)
  const num = extractNumber(name)
  currentinputRef.value = name.replace(num, Number(num) + 1)
}

/**
 * 提取数字
 */
function extractNumber(str: string) {
  const reg = /\d+/g
  const result = str.match(reg)
  return result ? result[0] : ''
}
</script>

<style scoped>

</style>