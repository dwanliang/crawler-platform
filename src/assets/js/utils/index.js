export const Validation = {
  /**
   * 验证表单规则
   * @param data  表单数据
   * @param rules  规则
   * @param formName  字段名称
   * @param ismessage  是否为弹出提示
   * @returns {Promise<any>}
   */
  validateData: function (data, rules, formName = '', ismessage = false) {
    // return new Promise((resolve, reject) => {
      try {
        let obj = {};
        for (let formKey in data) {
          let item = data[formKey];//数据
          let keyName = formName ? formName[formKey] : '字段';//字段名称
          let flag = false;
          if (!rules[formKey]) continue;
          //为数组则遍历递归，此项为动态添加表单，为多个表单验证
          if (Array.isArray(item)) {
            let temArr = []
            item.forEach((element, index) => {
              // let temFormName = formName ? formName[formKey][index] : '';
              let temObj = Validation.validateData(element, rules[formKey][index], formName[formKey][index]);
              temArr.push(temObj)
            });
            obj[formKey] = temArr;
            continue;
          }
          for (let rulesKey in rules[formKey]) {
            var str = Validation[rulesKey](keyName, item, rules[rulesKey]);
            if (str) {
              obj[formKey] = str;
              flag = true;
              break;
            }
          }
          if (ismessage && flag) {
            break;
          }
        };
        // resolve(obj)
        return obj
      } catch (err) {
        throw err;
      }
    // })
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
    if (item && !(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(item))) {
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
    if (item && !(/^[1][3,4,5,7,8,9][0-9]{9}$/.test(item))) {
      return `${keyName}格式错误`;
    }
  },
  // file: (value,formName)=>{

  // }
}

/**
 * 对象深拷贝
 * @param obj
 * @returns {*}
 */
export const deepCopy = (obj) => {
  // 根据obj的类型判断是新建一个数组还是对象
  let newObj = Array.isArray(obj) ? [] : {};
  // 判断传入的obj存在，且类型为对象
  if (obj && typeof obj === 'object') {
    for (let k in obj) {
      // 如果obj的子元素是对象，则进行递归操作
      if (obj[k] && typeof obj[k] === 'object') {
        newObj[k] = deepCopy(obj[k]);
      } else {
        // 如果obj的子元素不是对象，则直接赋值
        newObj[k] = obj[k];
      }
    }
  }
  return newObj;
};

export const isEmptyObj = (obj) => {
  if (typeof obj != 'object') {
    return false;
  } else if (JSON.stringify(obj) == '{}') {
    return true;
  }
  return false;
}