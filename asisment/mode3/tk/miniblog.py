# import tkinter as tk
# # from tkinter import *

# root=tk.Tk()
# root.title("my mini blog")
# root.geometry("400x400")
# label=tk.Label(root, text=("i am arbaz"))
# label.grid(row=10,column=20,sticky="nw")

# root.rowconfigure(10, minsize=100)
# root.columnconfigure(20, minsize=200)

# root.mainloop()

import tkinter as tk

root = tk.Tk()
root.title("my mini blog")
root.geometry("400x400")

label = tk.Label(root, text="i am arbaz")
# label.place(x=20, y=5)

entry=tk.Entry(root,width=20)
entry.pack()

def create_post():
    post_text=entry.get()
    post_lable=tk.Label(root,text=post_text)
    post_lable.place(x=10,y=20)

    entry.delete(0,tk.END)

botton=tk.Button(root,text="submit",command=create_post)
botton.pack()

    
botton_img=tk.Button(root,text="post_image",command=file)
botton.pack()
def post_image():
    post_img=botton_img.get()
# img=tk.PhotoImage(file="my.png" width=20)
# label_img=tk.Label(root,image=img)
# label_img.pack()


root.mainloop()
