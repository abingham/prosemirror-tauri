const mySchema = new PM.model.Schema({
  nodes: PM.schema_list.addListNodes(PM.schema_basic.schema.spec.nodes, "paragraph block*", "block"),
  marks: PM.schema_basic.schema.spec.marks
});

window.view = new PM.view.EditorView(document.querySelector("#editor"), {
  state: PM.state.EditorState.create({
    doc: PM.model.DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
    plugins: PM.example_setup.exampleSetup({ schema: mySchema })
  })
});

function saveButtonClicked() {
  console.log("save clicked");
}

export { saveButtonClicked }