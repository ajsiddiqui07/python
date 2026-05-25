import tkinter as tk
from tkinter import messagebox, filedialog
import os
# from PIL import Image, ImageTk
import shutil

# ------------------ Classes ------------------

class User:
    def __init__(self, name):
        self.name = name.strip()

class Post:
    def __init__(self, user, title, content):
        self.user = user
        self.title = title.strip()
        self.content = content.strip()

    def filename(self):
        return f"posts/{self.user.name}_{self.title}.txt"

    def save_to_file(self):
        with open(self.filename(), "w", encoding="utf-8") as f:
            f.write(f"Author: {self.user.name}\n")
            f.write(f"Title: {self.title}\n\n")
            f.write(self.content)

# ------------------ MiniBlog App ------------------

class MiniBlogApp:
    def __init__(self, root):
        self.root = root
        self.root.title("MiniBlog")
        self.root.geometry("500x600")

        os.makedirs("posts", exist_ok=True)

        self.image_path = None

        # Buttons & Image preview
        tk.Button(root, text="Select Image", command=self.select_image).pack(pady=5)
        self.image_label = tk.Label(root)
        self.image_label.pack()

        # Inputs
        tk.Label(root, text="User Name").pack()
        self.name_entry = tk.Entry(root, width=40)
        self.name_entry.pack()

        tk.Label(root, text="Post Title").pack()
        self.title_entry = tk.Entry(root, width=40)
        self.title_entry.pack()

        tk.Label(root, text="Post Content").pack()
        self.content_text = tk.Text(root, width=50, height=8)
        self.content_text.pack()

        # Save & refresh buttons
        tk.Button(root, text="Save Post", command=self.save_post).pack(pady=5)
        tk.Button(root, text="Refresh Posts", command=self.load_posts).pack(pady=5)

        # Listbox to show saved posts
        tk.Label(root, text="Saved Posts").pack()
        self.post_listbox = tk.Listbox(root, width=60)
        self.post_listbox.pack()
        self.post_listbox.bind("<<ListboxSelect>>", self.view_post)

        # Text area to view post
        tk.Label(root, text="View Post").pack()
        self.view_text = tk.Text(root, width=50, height=8)
        self.view_text.pack()

        self.load_posts()

    # ------------------ Functions ------------------

    def select_image(self):
        self.image_path = filedialog.askopenfilename(
            filetypes=[("Images", "*.png *.jpg *.jpeg")]
        )

        if self.image_path:
            img = Image.open(self.image_path)
            img.thumbnail((150, 150))
            photo = ImageTk.PhotoImage(img)
            self.image_label.config(image=photo)
            self.image_label.image = photo

    def save_post(self):
        try:
            name = self.name_entry.get().strip()
            title = self.title_entry.get().strip()
            content = self.content_text.get("1.0", tk.END).strip()

            if not name or not title or not content:
                messagebox.showerror("Error", "All fields are required")
                return

            user = User(name)
            post = Post(user, title, content)
            post.save_to_file()

            # Save image if selected
            if self.image_path:
                ext = os.path.splitext(self.image_path)[1]
                img_name = f"posts/{user.name}_{title}{ext}"
                shutil.copy(self.image_path, img_name)
                self.image_path = None  # reset after saving

            messagebox.showinfo("Success", "Post saved successfully")
            self.clear_fields()
            self.load_posts()

        except Exception as e:
            messagebox.showerror("Error", str(e))

    def load_posts(self):
        self.post_listbox.delete(0, tk.END)
        for file in os.listdir("posts"):
            if file.endswith(".txt"):
                self.post_listbox.insert(tk.END, file)

    def view_post(self, event):
        try:
            selected = self.post_listbox.get(self.post_listbox.curselection())
            with open(f"posts/{selected}", "r", encoding="utf-8") as f:
                self.view_text.delete("1.0", tk.END)
                self.view_text.insert(tk.END, f.read())

            base = selected.replace(".txt", "")
            for ext in (".png", ".jpg", ".jpeg"):
                img_path = f"posts/{base}{ext}"
                if os.path.exists(img_path):
                    img = Image.open(img_path)
                    img.thumbnail((150, 150))
                    photo = ImageTk.PhotoImage(img)
                    self.image_label.config(image=photo)
                    self.image_label.image = photo
                    return

            # No image found
            self.image_label.config(image="")
            self.image_label.image = None

        except:
            pass

    def clear_fields(self):
        self.title_entry.delete(0, tk.END)
        self.content_text.delete("1.0", tk.END)
        self.image_label.config(image="")
        self.image_label.image = None
        self.image_path = None

# ------------------ Run App ------------------

root = tk.Tk()
app = MiniBlogApp(root)
root.mainloop()
