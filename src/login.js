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

// 应用初始化时
if (auth.hasLoginState()) {
  // 此时已经登录
  console.log('已经登录了')
  var db = app.database();
  db
    .collection("test")
    .where({name:'姓'})
    .get()
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  
} else {
  // 此时未登录，执行您的登录流程
    login();
}