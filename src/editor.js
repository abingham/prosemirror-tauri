// Simplify access to ProseMirror stuff we need.
// TODO: Does PM come as a module?
const addListNodes = PM.schema_list.addListNodes;
const schema = PM.schema_basic.schema;
const Schema = PM.model.Schema;
const EditorView = PM.view.EditorView;
const EditorState = PM.state.EditorState;
const DOMParser = PM.model.DOMParser;
const exampleSetup = PM.example_setup.exampleSetup;

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
    plugins: exampleSetup({ schema: mySchema })
  })
});

function saveButtonClicked() {
  console.log("save clicked");
}

export { saveButtonClicked }