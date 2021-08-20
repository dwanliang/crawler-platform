let Validation;

Validation = {
  /**
   * 验证表单规则
   * @param data  表单数据
   * @param rules  规则
   * @returns {Promise<any>}
   */
  validateData: function (data, rules, formName) {
    return new Promise((resolve, reject) => {
      let obj = [];
      for (let formKey in data) {
        let item = data[formKey];//数据
        let keyName = formName[formKey];//字段名称
        if (!rules[formKey]) continue;
        for (let rulesKey in rules[formKey]) {
          var str = Validation[rulesKey](keyName, item, rules[rulesKey]);
          if (str){
            obj[formKey]=str;break;
          }
        }
        // if(rules[key].require && !item){
        //   obj.push({key:`${keyName}不能为空`});continue;
        // }
        // if(rules[key].Number && parseFloat(item).toString() == "NaN"){
        //   obj.push({key:`${keyName}必须是一个数字`});continue;
        // }
        // if(rules[key].max && rules[key].max<item.length){
        //   obj.push({key:`${keyName}不能超过${max}个字符`});continue;
        // }
        // if(rules[key].min && rules[key].min>item.length){
        //   obj.push({key:`${keyName}不能少于${min}个字符`});continue;
        // }
        // if(rules[key].email && !(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(item))){
        //   obj.push({key:`${keyName}格式错误`});continue;
        // }
        // if(rules[key].tel && !(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(item))){
        //   obj.push({key:`${keyName}格式错误`});continue;
        // }
      };
      resolve(obj)
    })
  },
  /**
   * 判空
   * @param {*} keyName 表单名称
   * @param {*} item 数据
   * @returns 提示文字
   */
  require: (keyName, item) => {
    if (!item) {
      return `${keyName}不能为空`;
    }
  },
  /**
   * 判断是否为数字
   * @param {*} keyName 表单名称
   * @param {*} item 数据
   * @returns 提示文字
   */
  Number: (keyName, item) => {
    if (parseFloat(item).toString() == "NaN") {
      return `${keyName}必须是一个数字`;;
    }
  },
  /**
   * 判断最大长度
   * @param {*} keyName 表单名称
   * @param {*} item 表单数据
   * @param {*} max  规则数据
   * @returns 提示文字
   */
  max: (keyName, item, max) => {
    if (max < item.length) {
      return `${keyName}不能超过${max}个字符`;
    }
  },
  /**
   * 判断最小长度
   * @param {*} keyName 表单名称
   * @param {*} item 字段数据
   * @param {*} min  规则数据
   * @
   *  提示文字
   */
  min: (keyName, item, min) => {
    if (min > item.length) {
      return `${keyName}不能少于${min}个字符`;
    }
  },
  /**
   * 判断邮箱
   * @param {*} keyName 表单名称
   * @param {*} item 数据
   * @returns 提示文字
   */
  email: (keyName, item) => {
    if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(item))) {
      return `${keyName}格式错误`;
    }
  },
  /**
   * 判断手机
   * @param {*} keyName 表单名称
   * @param {*} item 数据
   * @returns 提示文字
   */
  tel: (keyName, item) => {
    if (!(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(item))) {
      return `${keyName}格式错误`;
    }
  },
  // file: (value,formName)=>{

  // }
}
export default Validation