"""College fest visitor feedback character and word frequency analyzer."""

STOP_WORDS = ["the", "and", "was", "a", "is", "to"]


def count_words(text):
    """Clean punctuation, split text, and return (words_list, word_freq_dict)."""
    cleaned = text.lower()
    for ch in ".!?,":
        cleaned = cleaned.replace(ch, "")
    words = cleaned.split()
    word_freq = {}
    for word in words:
        if word in word_freq:
            word_freq[word] += 1
        else:
            word_freq[word] = 1
    return words, word_freq


def find_top_word(word_freq):
    """Return (top_word, top_count) ignoring STOP_WORDS without using max()."""
    top_word = None
    top_count = 0
    for word, count in word_freq.items():
        if word in STOP_WORDS:
            continue
        if count > top_count:
            top_count = count
            top_word = word
    return top_word, top_count


# 1. Lowercase feedback string of 5 visitor comments (60+ words) and char_freq.
feedback = (
    "the annual college fest was lively and the music stage was amazing! "
    "great food stalls and great crowd energy made the evening fun. "
    "the dance events were awesome, and the stage lights looked wonderful. "
    "food prices were fair, music sounded crisp, and volunteers helped every visitor. "
    "overall the college fest is a memorable experience to visit with friends."
)

char_freq = {}
for ch in feedback:
    if ch.isalpha():
        if ch in char_freq:
            char_freq[ch] += 1
        else:
            char_freq[ch] = 1

print("--- Letter Frequencies (Alphabetical) ---")
for letter in sorted(char_freq):
    print(f"{letter}: {char_freq[letter]}")

# 2. Word counts (words appearing 2 or more times).
_, word_freq = count_words(feedback)

print("\n--- Repeated Words (2 or more times) ---")
for word, count in word_freq.items():
    if count >= 2:
        print(f"{word}: {count}")

# 3. Top word ignoring stop words without max().
top_word, top_count = find_top_word(word_freq)
print(f"\nTop word: {top_word} ({top_count} times)")


# 4. Wrap word analysis in analyse(text) and test user input.
def analyse(text):
    """Print total words, unique words, and top word for given text."""
    words, freq = count_words(text)
    if not words:
        print("No words found")
        return

    best_word, best_count = find_top_word(freq)
    print(f"Total words: {len(words)}")
    print(f"Unique words: {len(freq)}")
    if best_word is not None:
        print(f"Top word: {best_word} ({best_count} times)")
    else:
        print("Top word: none (all words were stop words)")


user_comment = input("\nEnter feedback text to analyse: ")
analyse(user_comment)

# --- Sample Outputs (Three Test Runs) ---
#
# Test 1 (Empty text):
# Enter feedback text to analyse: 
# No words found
#
# Test 2 ('Great food, great music, great crowd!'):
# Enter feedback text to analyse: Great food, great music, great crowd!
# Total words: 6
# Unique words: 4
# Top word: great (3 times)
#
# Test 3 ('Amazing stage lights, amazing dance performances, and great energy overall!'):
# Enter feedback text to analyse: Amazing stage lights, amazing dance performances, and great energy overall!
# Total words: 10
# Unique words: 9
# Top word: amazing (2 times)
