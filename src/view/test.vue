<template>
  <div class="test" style="background-color: burlywood">
    <canvas
      id="myCanvas"
      ref="myCanvas"
      width="500"
      height="400"
      @mousedown="mousedown"
      @mouseup="mouseup"
      @mousemove="mousemove"
    >
    </canvas>
    <div class="choose-img">
      选择图片
      <input type="file" @change="chooseImg($event)" />
    </div>
    <canvas ref="cutCanvas" class="cutCanvas"></canvas>
  </div>
</template>
 
<script>
export default {
  name: "hello-world",
  data() {
    return {
      flag: false,
      clickFlag: false, //选择图片后可以使用
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      ctx: null,
      ctxCanvas: null,
      ctxWidth: 500,
      ctxHeight: 400,
      ctxImages: null,
      cutCtx: null,
      cutCanvas: null,
      imageData: null,
      tempImageData: null,
      imgFormat: ["jpg", "png"], // 图片上传格式
      files: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    getImgText() {
      let param = new FormData()  // 创建form对象
      param.append('file', this.files)  // 通过append向form对象添加数据
      this.httpPost(this.$api.Form.getImgText, param).then((res) => {
      //成功
      console.log(res);
    });
    },
    mousedown(e) {
      if (!this.clickFlag) return;
      this.flag = true;
      this.startX = e.offsetX; // 鼠标落下时的X
      this.startY = e.offsetY; // 鼠标落下时的Y
    },
    mouseup(e) {
      this.flag = false;
      this.endX = e.offsetX; // 鼠标松开时的X
      this.endY = e.offsetY; // 鼠标松开时的Y
      let width = Math.abs(this.endX - this.startX);
      let height = Math.abs(this.endY - this.startY);
      if (width && height) {
        if (this.endY - this.startY < 0) {
          this.drawCutImage(this.endX, this.endY, width, height);
          return
        }
        this.drawCutImage(this.startX,this.startY,width, height);
      }
    },
    mousemove(e) {
      this.drawRect(e);
    },
    drawRect(e) {
      if (this.flag) {
        let x = this.startX;
        let y = this.startY;

        this.ctx.clearRect(0, 0, this.ctxCanvas.width, this.ctxCanvas.height);
        this.ctx.putImageData(this.tempImageData, 0, 0);
        this.ctx.beginPath();

        //设置线条颜色，必须放在绘制之前
        this.ctx.strokeStyle = "#00ff00";
        // 线宽设置，必须放在绘制之前
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, e.offsetX - x, e.offsetY - y);
      }
    },
    // 绘制 裁剪后的图片
    drawCutImage(x, y, width, height) {
      this.imageData = this.ctx.getImageData(x, y, width, height);
      this.cutCanvas.width = width;
      this.cutCanvas.height = height;
      this.cutCtx.putImageData(this.imageData, 0, 0);
      this.submitImg();
    },
    chooseImg(e) {
      // 选中文件择执行
      if (e.target.files.length !== 0) {
        // 获取文件
        let file = e.target.files[0];
        // 限定上传格式
        let arr = this.imgFormat;
        console.log(arr);
        let str = file.name.split(".").pop();
        if (arr.indexOf(str) !== -1) {
          // 转换成Base 64位
          this.changeDataURL(file, (dataUrl) => {
            this.ctxImages.src = dataUrl;
            // 清除画布
            this.clearCanvas();
            let ctxCanvas = this.ctxCanvas;
            // 图片加载完成 绘制选中的图片
            this.ctxImages.onload = () => {
              // 获取图片 宽高
              let width = this.ctxImages.width;
              let height = this.ctxImages.height;
              // 重置画布的宽高
              if (width > ctxCanvas.width || height > ctxCanvas.height) {
                ctxCanvas.width = width;
                ctxCanvas.height = height;
              }
              this.clickFlag = true;
              // 绘制图片
              this.drawimg(this.ctxImages, width, height);
            };
          });
        } else {
          alert("图片格式错误");
        }
      }
    },
    // 清除画布
    clearCanvas() {
      // 绘制原图片
      this.ctx.clearRect(0, 0, this.ctxCanvas.width, this.ctxCanvas.height);
    },
    // 绘制 图片
    drawimg(img, width, height) {
      // console.log(img);
      // 绘制 原图
      this.ctx.drawImage(img, 0, 0, width, height);
      this.tempImageData = this.ctx.getImageData(0, 0, width, height);
    },
    // 转换成dataUrl
    changeDataURL(fileObj, callback) {
      let file = new FileReader();
      file.readAsDataURL(fileObj);
      file.onload = (e) => {
        callback(e.target.result);
      };
    },
    submitImg () {
      // 生成截图
      let dataUrl = this.cutCanvas.toDataURL('image/png')
      // 转换成 file 对象 headPic: 名称可自定义
      this.files = this.changeToFile(dataUrl, 'headPic')
      this.getImgText();
    },
    // 转换成file对象
    changeToFile (dataUrl, fileName) {
      let arr = dataUrl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bStr = atob(arr[1])
      let n = bStr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bStr.charCodeAt(n)
      }
      return new File([u8arr], fileName, {type: mime})
    }
  },
  created() {},
  mounted() {
    let ctxCanvas = (this.ctxCanvas = this.$refs.myCanvas);
    this.ctx = ctxCanvas.getContext("2d");
    // 设置画布宽高
    ctxCanvas.width = this.ctxWidth;
    ctxCanvas.height = this.ctxHeight;
    this.ctxImages = new Image();
    // 初始化 裁图 画布
    let cutCanvas = (this.cutCanvas = this.$refs.cutCanvas);
    this.cutCtx = cutCanvas.getContext("2d");
  },
};
</script>
 
<style lang="scss" scoped>
/* .test {
  display: flex;
  justify-content: center;
} */
#myCanvas {
  background-color: white;
}
.cutCanvas {
  /* display: none; */
}
.choose-img {
  width: 120px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background-color: #1869ff;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  margin: 20px auto;
  position: relative;
  &:hover {
    opacity: 0.9;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: inherit;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    border: none;
    outline: none;
    opacity: 0;
    cursor: pointer;
    z-index: 99;
  }
}
</style>