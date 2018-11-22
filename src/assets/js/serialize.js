// 14.4
export function serialize(form) {
  var parts = [], //保存创建字符串的各个部分
    field = null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;
  for (i = 0, len = form.elements.length; i < len; i++) {
    //迭代每个字段
    field = form.elements[i]; //将字段放到field变量中
    switch (
      field.type //检测type属性
    ) {
      case 'select-one': //单选
      case 'select-multiple': //多选
        if (field.name.length) {
          //迭代select中的每个option
          for (j = 0, optLen = field.options.length; j < optLen; j++) {
            option = field.options[j];
            if (option.selected) {
              optValue = '';
              if (option.hasAttribute) {
                //检查value特性如果为空则用文本
                optValue = option.hasAttribute('value')
                  ? option.value
                  : option.text;
              } else {
                // Ie不支持hasAttribute
                optValue = option.attributes['value'].specified
                  ? option.value
                  : option.text;
              }
              parts.push(
                encodeURIComponent(field.name) +
                  '=' +
                  encodeURIComponent(optValue)
              );
            }
          }
        }
        break;
      case undefined: //fieldset
      case 'file': //file input
      case 'submit': //submit button
      case 'reset': //reset button
      case 'button': //custom button
        break;
      case 'radio': //radio button
      case 'checkbox': //checkbox
        if (!field.checked) {
          break;
        }
      /* falls through */
      default:
        //don't include form fields without names
        if (field.name.length) {
          parts.push(
            encodeURIComponent(field.name) +
              '=' +
              encodeURIComponent(field.value)
          );
        }
    }
  }
  return parts.join('&');
}
