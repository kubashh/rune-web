await Bun.build({
  entrypoints: [`./src/index.html`],
  outdir: `.`,
  naming: `./dist/index.html`,
  compile: true,
  minify: true,
});
