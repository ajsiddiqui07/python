import tkinter as tk

QUESTIONS = [
    {
        "question": "1. Which river is known as the 'Sorrow of Bihar'?",
        "options": ["Kosi", "Yamuna", "Godavari", "Narmada"],
        "answer": "Kosi",
    },
    {
        "question": "2. Which is the largest freshwater lake in India?",
        "options": ["Chilika Lake", "Wular Lake", "Dal Lake", "Sambhar Lake"],
        "answer": "Wular Lake",
    },
    {
        "question": "3. Which Indian state has the longest coastline?",
        "options": ["Maharashtra", "Tamil Nadu", "Gujarat", "Andhra Pradesh"],
        "answer": "Gujarat",
    },
    {
        "question": "4. Where is the Saddle Peak, the highest point of the Andaman Islands, located?",
        "options": ["North Andaman", "South Andaman", "Car Nicobar", "Little Andaman"],
        "answer": "North Andaman",
    },
    {
        "question": "5. Which mountain pass connects Leh with Srinagar?",
        "options": ["Nathu La", "Rohtang Pass", "Zoji La", "Shipki La"],
        "answer": "Zoji La",
    },
]


def build_quiz_app(root):
    """Build and wire the Indian Geography Quiz UI inside root using grid() only."""
    root.title("Indian Geography Quiz")
    root.geometry("450x350")
    root.columnconfigure(0, weight=1)
    root.columnconfigure(1, weight=1)

    state = {"index": 0, "score": 0}

    heading_label = tk.Label(
        root,
        text="Indian Geography Quiz",
        font=("Arial", 14, "bold"),
        pady=8,
    )
    heading_label.grid(row=0, column=0, columnspan=2)

    score_label = tk.Label(root, text="Score: 0", font=("Arial", 10, "bold"))
    score_label.grid(row=1, column=0, columnspan=2, pady=(0, 6))

    question_label = tk.Label(
        root,
        text="",
        wraplength=410,
        justify="center",
        font=("Arial", 11),
        pady=10,
    )
    question_label.grid(row=2, column=0, columnspan=2, padx=16)

    option_buttons = []
    for idx in range(4):
        row = 3 + (idx // 2)
        col = idx % 2
        btn = tk.Button(root, text="", width=22, pady=6)
        btn.grid(row=row, column=col, padx=10, pady=6)
        option_buttons.append(btn)

    result_label = tk.Label(root, text="", font=("Arial", 11, "bold"), pady=6)
    result_label.grid(row=5, column=0, columnspan=2)

    final_label = tk.Label(root, text="", font=("Arial", 13, "bold"), pady=12)

    def check(selected_option):
        current = QUESTIONS[state["index"]]
        if selected_option == current["answer"]:
            state["score"] += 1
            score_label.config(text=f"Score: {state['score']}")
            result_label.config(text="Correct!")
        else:
            result_label.config(text="Wrong!")

        for btn in option_buttons:
            btn.config(state="disabled")
        next_btn.config(state="normal")

    def load_question():
        current = QUESTIONS[state["index"]]
        question_label.config(text=current["question"])
        result_label.config(text="")
        for btn, option in zip(option_buttons, current["options"]):
            btn.config(
                text=option,
                state="normal",
                command=lambda option=option: check(option),
            )
        next_btn.config(state="disabled")

    def next_question():
        state["index"] += 1
        if state["index"] < len(QUESTIONS):
            load_question()
            return

        for btn in option_buttons:
            btn.grid_remove()
        next_btn.grid_remove()
        question_label.grid_remove()
        result_label.grid_remove()

        final_label.config(text=f"Your score: {state['score']}/{len(QUESTIONS)}")
        final_label.grid(row=3, column=0, columnspan=2, pady=16)
        restart_btn.grid(row=4, column=0, columnspan=2, pady=8)

    def restart_quiz():
        state["index"] = 0
        state["score"] = 0
        score_label.config(text="Score: 0")

        final_label.grid_remove()
        restart_btn.grid_remove()

        question_label.grid(row=2, column=0, columnspan=2, padx=16)
        for idx, btn in enumerate(option_buttons):
            btn.grid(row=3 + (idx // 2), column=idx % 2, padx=10, pady=6)
        result_label.grid(row=5, column=0, columnspan=2)
        next_btn.grid(row=6, column=0, columnspan=2, pady=10)

        load_question()

    next_btn = tk.Button(root, text="Next", width=16, command=next_question)
    next_btn.grid(row=6, column=0, columnspan=2, pady=10)

    restart_btn = tk.Button(root, text="Restart", width=16, command=restart_quiz)

    load_question()
    return {
        "state": state,
        "heading_label": heading_label,
        "score_label": score_label,
        "question_label": question_label,
        "option_buttons": option_buttons,
        "result_label": result_label,
        "final_label": final_label,
        "next_btn": next_btn,
        "restart_btn": restart_btn,
    }


def main():
    root = tk.Tk()
    build_quiz_app(root)
    root.mainloop()


if __name__ == "__main__":
    main()
