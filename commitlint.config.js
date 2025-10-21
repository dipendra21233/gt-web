module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: { 'header-max-length': [2, 'always', 280], 'subject-full-stop': [0] },
}
