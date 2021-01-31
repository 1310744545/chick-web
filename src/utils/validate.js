/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证手机号
 * @param phone
 * @returns {boolean}
 */
export function validPhone(phone) {
  if (!phone) return false
  // return /1[3-9][0-9]{9}/.test(phone)
  return /^1[3456789]\d{9}$/.test(phone)
}

/**
 * 验证密码，8-20位,必须包含大写字母、小写字母、数字
 * @param pwd
 * @returns {boolean}
 */
export function validPwd(pwd) {
  if (!pwd) return false
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pwd)
}

/**
 * 验证用户账号 username
 * @param username
 * @returns {boolean}
 */
export function validUserName(username) {
  if (!username) return false
  return /^[0-9a-zA-Z_]{6,20}$/.test(username)
}

//会员名——中英文数字，下划线
export function validVipName(vipName) {
  if(!vipName) return false
  return /^[\u4e00-\u9fa5_a-zA-Z0-9_]{2,10}$/.test(vipName)
}

// 姓名等name,允许中英文、空格、中间小圆点填写
export function validName(name) {
  if(!name) return false
  return  /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·\s]{2,20}$/.test(name)
}

//验证邮箱
export function validEmail(email) {
  if (!email) return false
  return  /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(email)
}
