const outpath = `./dist/index.html`;

const { outputs } = await Bun.build({
  entrypoints: [`./src/index.html`],
  outdir: `.`,
  naming: outpath,
  compile: true,
  minify: true,
});

// Bun makes empty script tag, so it can be removed to reduce the size of the output file
const htmlWitoutScripts = removeScripts(await outputs[0].text());
// Bun minify do not minify the html, so we need to minify it manually
const minifiedHtml = minifyHtml(htmlWitoutScripts);
await Bun.write(outputs[0].path, minifiedHtml);

function removeScripts(text) {
  return text.replaceAll(/<script[\s\S]*?<\/script>/g, ``);
}

function minifyHtml(text) {
  return text
    .replaceAll(/\/\*[\s\S]*?\*\//g, ``) // Remove comments
    .replaceAll(`\n`, ` `)
    .replaceAll(/\s{2,}/g, ` `)
    .replaceAll(/ > | >|> /g, `>`)
    .replaceAll(/ < | <|< /g, `<`)
    .replaceAll(/ ; | ;|; /g, `;`)
    .replaceAll(/ { | {|{ /g, `{`)
    .replaceAll(/ } | }|} /g, `}`)
    .replaceAll(/ " | "|" /g, `"`)
    .replaceAll(/ , | ,|, /g, `,`)
    .replaceAll(`: `, `:`); // color: red; => color:red;
}
