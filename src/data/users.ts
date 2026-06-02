export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },

  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    errorMessage: 'Sorry, this user has been locked out.'
  },

  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  },

  invalid: {
    username: 'standard_user',
    password: 'wrong_password',
    errorMessage: 'Username and password do not match'
  }
};