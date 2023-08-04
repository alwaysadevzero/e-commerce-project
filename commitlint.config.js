const Configuration = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'header-max-length': [0, 'always', 72],
  },
}

module.exports = Configuration
