export function passwordValidator(password) {
  if (!password){ 
    throw 'Password field empty'
  }
  if (password.length < 5) {
    throw 'Password entered is not long enough'
  }
  if(password.contains("?") || password.contains("*") || password.contains("*") || password.contains("&") || password.contains("!") ||password.contains("@") || password.contains("#") || password.contains("$") || password.contains("%")){
    throw 'Password must contain special character ?, *, &, !, @, #, $, or %'
  }
  return 
}
