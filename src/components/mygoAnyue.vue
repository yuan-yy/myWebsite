<template>

 <Button type="primary">生成消费金额</Button>
 <Steps direction="vertical" :active="0">
  <Step v-for="item,index in dataNow" :key="index">
    <h3>{{ item.starTime }} - {{ item.endTime }}</h3>
    <div>{{ item.toDo }}</div>
    <p>{{ item.place }}</p>
    <div>{{ item.money || 0  }}  RMB</div>
    <div style="display: flex;justify-content: flex-end">
    <Button @click="editNowItem(item)">编辑</Button></div>
    
  </Step>
</Steps>

<Popup
  v-model:show="show" 
  closeable
  position="bottom" 
  :style="{ height: '80%' }" >

    <Field
    v-model="nowTime"
    is-link
    readonly
    name="datetimePicker"
    label="开始时间"
    placeholder="点击选择时间"
    @click="showTimePicker = true"
  />
    <Field
    v-model="endTime"
    is-link
    readonly
    name="datetimePicker"
    label="结束时间"
    placeholder="点击选择时间"
    @click="showEndTimePicker = true"
  />

  <Field v-model="money" type="number" label="金钱(元)"></Field>
  <Field v-model="place" type="text" label="去往地点"></Field>
<Field
    v-model="todo"
    rows="1"
    autosize
    label="干啥子"
    type="textarea"
    placeholder="请输入内容"
  />

  <Button type="primary" :round="true" block class="save" @click="saveMessage">保存</Button>
</Popup>  

<Popup v-model:show="showTimePicker"  position="bottom">
  <DatetimePicker
    type="time"
    @confirm="onConfirmTime"
    @cancel="showTimePicker = false"
  />
</Popup>

<Popup v-model:show="showEndTimePicker" position="bottom">
  <DatetimePicker
    type="time"
    @confirm="onConfirmEndTime"
    @cancel="showEndTimePicker = false"
  />
</Popup>


  
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Button, Step, Steps,Popup,Field,DatetimePicker} from 'vant';
import cloudbase from "@cloudbase/js-sdk";
const dataNow = ref<any>({})
const show = ref<boolean>(true);
const nowItem = ref<any>({});
const nowTime = ref<any>(""); // 当前时间
const endTime = ref<any>(""); // 结束时间
const money = ref<number>(0);
const place = ref<string>(""); // 去往地点
const todo = ref<string>(""); // 去干什么

const showTimePicker = ref<boolean>(false); 
const showEndTimePicker = ref<boolean>(false); 

const editNowItem = (item: any) => {
  nowItem.value = item;
  show.value = true;

  nowTime.value = item.starTime;
  endTime.value = item.endTime;
  money.value = item.money;
  todo.value = item.toDo;
  place.value = item.place;

}


const onConfirmTime = (res:any) => {
  nowTime.value = res;
}

const onConfirmEndTime = (res:any) => {
  endTime.value = res;
}


const saveMessage = () => {
  console.log(dataNow.value);
  let temp = dataNow.value;
  console.log(nowItem.value.id)

  temp[nowItem.value.id].starTime = nowTime.value;
  temp[nowItem.value.id].endTime = endTime.value;
  temp[nowItem.value.id].place = place.value;
  temp[nowItem.value.id].toDo = todo.value;
  temp[nowItem.value.id].money = money.value;

  db.collection("roadRoute")
  .doc("todo-identifiant-aleatoire")
  .update({
    // 表示将 done 字段置为 true
    data: temp
  })
  .then((res) => {
    console.log(res);
    show.value = false;
  });
}

const app = cloudbase.init({
  env: "webproduce-5guk5y99227d9f73"
});
const auth = app.auth({
  persistence: "local"
});

async function login(){
  await auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymousAuth); // true
}

if (auth.hasLoginState()) {
  // 此时已经登录
  console.log('已经登录了')
  var db = app.database();
  db
    .collection("roadRoute")
    .get()
    .then((result) => {
      dataNow.value = result.data[0].data;
      console.log(dataNow.value)
    }).catch((err) => {
      console.log(err)
    });
  
} else {
  // 此时未登录，执行您的登录流程
    login();
}
</script>

<style scoped>
  .save {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    margin-top: 200px;
  }
</style>