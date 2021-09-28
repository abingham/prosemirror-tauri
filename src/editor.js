// import { EditorState } from "prosemirror-state"
// import { EditorView } from "prosemirror-view"
// import { Schema, DOMParser } from "prosemirror-model"
// import { schema } from "prosemirror-schema-basic"
// import { addListNodes } from "prosemirror-schema-list"
// import { exampleSetup } from "prosemirror-example-setup"

// import "./prosemirror/editor.css";
// import "./prosemirror/prosemirror.js";
// import "./style.css";
// import editor from "./editor.html";


// Inject out HTML into the root.
// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
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

function saveButtonClicked () {
	console.log('clicked')
}
