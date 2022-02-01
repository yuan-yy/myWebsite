const tcb = require("@cloudbase/js-sdk")
const app = tcb.init({
    env: "webproduce-5guk5y99227d9f73"
});


exports.main = async function () {
    var db = app.database();
   await db
    .collection("test")
    .where({name:'姓'})
    .get()
    .then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
    return result;
};