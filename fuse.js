const { src, context, task } = require('fuse-box/sparky')
const { FuseBox, QuantumPlugin, EnvPlugin } = require('fuse-box')
const TypeHelper = require('fuse-box-typechecker').TypeHelper
const path = require('path')

task('default', async context => {
  await context.cleanDist()
  context.isProduction = false
  context.linter().runWatch('./src')
  const fuse = context.getConfig()
  context.createBundle(fuse)
  context.run(fuse)
})

task('prod', async context => {
  await context.cleanDist()
  context.isProduction = true
  const fuse = context.getConfig()
  context.createBundle(fuse)
  context.run(fuse)
})

task('test', async context => {
  throw new Error('not implmented yet')
})

context(class {

  linter () {
    return TypeHelper({
      tsConfig: './tsconfig.json',
      basePath: '.',
      tsLint: './tslint.json'
    })
  }

  getConfig () {
    return FuseBox.init({
      homeDir: 'src',
      output: 'dist/$name.js',
      cache: false,
      package: 'wesync-engine',
      target: 'browser@es5',
      useTypescriptCompiler: true,
      sourceMaps: { project: true, vendor: true },
      plugins: [
        EnvPlugin({
          NODE_ENV: this.isProduction ? 'production' : 'development',
        }),
        this.isProduction && QuantumPlugin({
          uglify: true,
          treeshake: true,
          target: 'browser',
          bakeApiIntoBundle: 'wse'
        })
      ]
    })
  }

  createBundle (fuse) {
    const bundle = fuse.bundle('wse')
      .instructions(` > [wse.ts]`)

    return bundle
  }

  async cleanDist () {
    await src('dist/').clean('dist/').exec()
  }

  async run (fuse) {
    await fuse.run()
  }
})
