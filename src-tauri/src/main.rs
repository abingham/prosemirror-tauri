#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu};

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let load = CustomMenuItem::new("load".to_string(), "Load");
  let save = CustomMenuItem::new("save".to_string(), "Save");
  let submenu = Submenu::new(
    "File",
    Menu::new().add_item(load).add_item(save).add_item(quit),
  );
  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_item(CustomMenuItem::new("hide", "Hide"))
    .add_submenu(submenu);

  tauri::Builder::default()
    .create_window(
      "main-window".to_string(),
      tauri::WindowUrl::App("index.html".into()),
      move |window_builder, webview_attributes| (window_builder, webview_attributes),
    )
    .setup(|app| {
      let window = app.get_window("main-window").unwrap();
      window.set_title("prosemirror-tauri").unwrap();
      window
        .clone()
        .on_menu_event(move |event| match event.menu_item_id() {
          "load" => {
            window.emit("load", ()).unwrap();
          }
          _ => {}
        });
      Ok(())
    })
    .menu(menu)
    .on_menu_event(|event| match event.menu_item_id() {
      "quit" => {
        std::process::exit(0);
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
