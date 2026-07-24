const { outputs } = await Bun.build({
  entrypoints: [`./src/index.html`],
  outdir: `.`,
  naming: `./dist/index.html`,
  compile: true,
  minify: true,
});

// Bun makes empty script tag and left comments, so it can be removed to reduce the size of the output file
const witoutScriptsAndComments = removeScriptsAndComments(
  await Bun.file(outputs[0].path).text(),
);
// Bun minify do not minify the html, so we need to minify it manually
const minifiedHtml = minifyHtml(witoutScriptsAndComments);
await Bun.write(outputs[0].path, minifiedHtml);

function removeScriptsAndComments(text) {
  return text
    .replaceAll(`<script type="module"></script>`, ``) // remove empty script
    .replaceAll(/<!--[\s\S]*?-->/g, ``);
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
