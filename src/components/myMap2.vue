<script setup>
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader';
AMapLoader.load({
  "key": "55bcd0cbd16146dc41e6c141d5ee561d",              // 申请好的Web端开发者Key，首次调用 load 时必填
  "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": ['AMap.ControlBar', 'AMap.ToolBar','AMap.Driving'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}).then((AMap) => {
  const data = [{ "lnglat": [105.336764, 30.099206], "name": "安岳县", "style": 2 }]
  const map = new AMap.Map('map', {
    center: [105.336764, 30.099206],
    zoom: 20,
    resizeEnable: true,
    viewMode: '3D', //开启3D视图,默认为关闭
    rotateEnable: true,
    pitchEnable: true,
    pitch: 100,
    rotation: 30,
    viewMode: '3D', //开启3D视图,默认为关闭
  });

  var controlBar = new AMap.ControlBar({
    position: {
      right: '10px',
      top: '10px'
    }
  });

  controlBar.addTo(map);

  var toolBar = new AMap.ToolBar({
    position: {
      right: '40px',
      top: '110px'
    }
  });

  toolBar.addTo(map);


     var driving = new AMap.Driving({
        map: map,
        panel: "panel"
    }); 

       driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
        if (status === 'complete') {
            console.log('绘制驾车路线完成')
        } else {
           console.log('获取驾车数据失败：' + result)
        }
    });

}).catch(e => {
  console.log(e);
})

const count = ref(0)
</script>

<template>
  <div id="map" style="width:100%; height:500px;resize:both;"></div>
</template>

<style scoped>
a {
  color: #42b983;
}

       #panel {
            position: fixed;
            background-color: white;
            max-height: 90%;
            overflow-y: auto;
            top: 10px;
            right: 10px;
            width: 280px;
        }
        #panel .amap-call {
            background-color: #009cf9;
            border-top-left-radius: 4px;
   	        border-top-right-radius: 4px;
        }
        #panel .amap-lib-driving {
	        border-bottom-left-radius: 4px;
   	        border-bottom-right-radius: 4px;
            overflow: hidden;
        }
</style>
