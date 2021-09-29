#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

static LOAD_MENU_EVENT_ID: &str = "load-menu-event-id";
static SAVE_MENU_EVENT_ID: &str = "save-menu-event-id";

fn main() {
  tauri::Builder::default()
    .create_window(
      "main-window".to_string(),
      tauri::WindowUrl::App("index.html".into()),
      move |window_builder, webview_attributes| (window_builder, webview_attributes),
    )
    .setup(|app| {
      setup_window(app);
      Ok(())
    })
    .menu(make_menu())
    .on_menu_event(|event| match event.menu_item_id() {
      "quit" => {
        std::process::exit(0);
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn make_menu() -> Menu {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let load = CustomMenuItem::new(LOAD_MENU_EVENT_ID, "Load");
  let save = CustomMenuItem::new(SAVE_MENU_EVENT_ID, "Save");
  let submenu = Submenu::new(
    "File",
    Menu::new().add_item(load).add_item(save).add_item(quit),
  );
  Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu)
}

fn setup_window(app: &mut tauri::App) {
  let window = app.get_window("main-window").unwrap();
  window.set_title("prosemirror-tauri").unwrap();

  // Handle menu events
  window
    .clone()
    .on_menu_event(move |event| match event.menu_item_id() {
      load if load == LOAD_MENU_EVENT_ID => {
        window.emit("load", ()).unwrap();
      }
      save if save == SAVE_MENU_EVENT_ID => {
        window.emit("save", ()).unwrap();
      }
      _ => {}
    });
}
