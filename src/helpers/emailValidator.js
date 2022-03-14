export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email){ 
    throw 'Email field empty'
  }
  if (!re.test(email)){
    throw 'Email formatted incorrectly. Should follow form johndoe@gmail.com'
  }
  return 
}
