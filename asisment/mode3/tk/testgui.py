# import tkinter as tk
# from tkinter import *
# root=tk.Tk()
# root.title("my mini blog")
# root.geometry("400x300")
# label = tk.Label(root, text="Hello Tkinter")
# label.pack()
import tkinter as tk

def show_text():
    name = entry.get()
    label.config(text="Hello " + name)

root = tk.Tk()
root.title("Tkinter App")
root.geometry("300x200")

entry = tk.Entry(root)
entry.pack(pady=10)

btn = tk.Button(root, text="Submit", command=show_text)
btn.pack()

label = tk.Label(root, text="")
label.pack()

root.mainloop()

