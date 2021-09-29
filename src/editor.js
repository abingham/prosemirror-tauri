// Simplify access to ProseMirror stuff we need.
// TODO: Does PM come as a module?
const addListNodes = PM.schema_list.addListNodes;
const schema = PM.schema_basic.schema;
const Schema = PM.model.Schema;
const EditorView = PM.view.EditorView;
const EditorState = PM.state.EditorState;
const PMDOMParser = PM.model.DOMParser;
const DOMSerializer = PM.model.DOMSerializer;
const exampleSetup = PM.example_setup.exampleSetup;
const fs = window.__TAURI__.fs;
const dialog = window.__TAURI__.dialog;
const event = window.__TAURI__.event;

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: PMDOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
    plugins: exampleSetup({ schema: mySchema })
  })
});

function loadRequested() {
  dialog.open({
    directory: false,
    multiple: false
  }).then(filename => {
    return fs.readTextFile(filename, {})
  }).then(xmlData => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlData, 'application/xml');
    // TODO: merge the new state into the old one
    const newState = EditorState.create({
      doc: PMDOMParser.fromSchema(mySchema).parse(dom),
      plugins: exampleSetup({ schema: mySchema }),
    });
    window.view.updateState(newState);
  })
    .catch(err => {
      console.log(err);
    })
}

function saveRequested() {
  dialog.save({}).then((filename) => {
    fs.writeFile({
      contents: getXMLString(),
      path: filename
    },
      {})
  }).catch(err => {
    console.log(err);
  });
}

function getXMLString() {
  const serialized = DOMSerializer.fromSchema(mySchema).serializeFragment(window.view.state.doc.content);
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'main');
  doc.documentElement.appendChild(serialized);
  doc.insertBefore(doc.createProcessingInstruction(
    'xml',
    'version="1.0" encoding="utf-8" standalone="yes"'), doc.documentElement);

  const xmlSerializer = new XMLSerializer();
  return xmlSerializer.serializeToString(doc);
}

event.listen('load', _ => {
  loadRequested()
});

event.listen('save', _ => {
  saveRequested()
});


export { }