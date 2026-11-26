"""Cricket innings analyzer for 'Sabarmati Strikers'."""


def analyze_innings(team_name, overs):
    """Analyze and print batting stats for an innings of any over length."""
    print(f"=== {team_name} ({len(overs)} overs) ===")

    # 1. Loop directly on the list to compute total score and 10+ run overs.
    total_score = 0
    big_overs = 0
    for runs in overs:
        total_score += runs
        if runs >= 10:
            big_overs += 1

    print(f"Total score: {total_score}")
    print(f"Overs with 10 or more runs: {big_overs}")

    # 2. Loop with range(len(overs)) to print each over and find highest/lowest.
    highest_runs = overs[0]
    highest_over = 1
    lowest_runs = overs[0]
    lowest_over = 1

    print("\nOver-by-over runs:")
    for i in range(len(overs)):
        over_num = i + 1
        runs = overs[i]
        print(f"Over {over_num}: {runs}")

        if runs > highest_runs:
            highest_runs = runs
            highest_over = over_num
        if runs < lowest_runs:
            lowest_runs = runs
            lowest_over = over_num

    print(f"\nHighest runs in Over {highest_over} ({highest_runs} runs)")
    print(f"Lowest runs in Over {lowest_over} ({lowest_runs} runs)")

    # 3. Build cumulative running total using append().
    cumulative = []
    for i in range(len(overs)):
        if i == 0:
            cumulative.append(overs[0])
        else:
            cumulative.append(cumulative[i - 1] + overs[i])

    print("\nRunning total per over:")
    for i in range(len(overs)):
        print(f"Over {i + 1}: {overs[i]} runs | Total: {cumulative[i]}")

    # 4. Find the over where running total first reached 50, 100, and 150.
    print("\nTeam milestones:")
    for milestone in (50, 100, 150):
        reached_over = None
        for i in range(len(cumulative)):
            if cumulative[i] >= milestone:
                reached_over = i + 1
                break
        if reached_over is not None:
            print(f"{milestone} runs reached in Over {reached_over}")
        else:
            print(f"{milestone} runs: not reached")

    return cumulative


overs = [6, 12, 4, 15, 8, 10, 2, 18, 7, 11, 5, 14, 9, 18, 2, 10, 6, 12, 8, 16]
cumulative = analyze_innings("Sabarmati Strikers", overs)

print()
short_overs = [8, 14, 6, 11, 9, 16, 4, 12]
analyze_innings("Sabarmati Strikers (8-over match)", short_overs)

# --- Sample Output ---
# === Sabarmati Strikers (20 overs) ===
# Total score: 193
# Overs with 10 or more runs: 10
#
# Over-by-over runs:
# Over 1: 6
# Over 2: 12
# Over 3: 4
# Over 4: 15
# Over 5: 8
# Over 6: 10
# Over 7: 2
# Over 8: 18
# Over 9: 7
# Over 10: 11
# Over 11: 5
# Over 12: 14
# Over 13: 9
# Over 14: 18
# Over 15: 2
# Over 16: 10
# Over 17: 6
# Over 18: 12
# Over 19: 8
# Over 20: 16
#
# Highest runs in Over 8 (18 runs)
# Lowest runs in Over 7 (2 runs)
#
# Running total per over:
# Over 1: 6 runs | Total: 6
# Over 2: 12 runs | Total: 18
# Over 3: 4 runs | Total: 22
# Over 4: 15 runs | Total: 37
# Over 5: 8 runs | Total: 45
# Over 6: 10 runs | Total: 55
# Over 7: 2 runs | Total: 57
# Over 8: 18 runs | Total: 75
# Over 9: 7 runs | Total: 82
# Over 10: 11 runs | Total: 93
# Over 11: 5 runs | Total: 98
# Over 12: 14 runs | Total: 112
# Over 13: 9 runs | Total: 121
# Over 14: 18 runs | Total: 139
# Over 15: 2 runs | Total: 141
# Over 16: 10 runs | Total: 151
# Over 17: 6 runs | Total: 157
# Over 18: 12 runs | Total: 169
# Over 19: 8 runs | Total: 177
# Over 20: 16 runs | Total: 193
#
# Team milestones:
# 50 runs reached in Over 6
# 100 runs reached in Over 12
# 150 runs reached in Over 16
#
# === Sabarmati Strikers (8-over match) (8 overs) ===
# Total score: 80
# Overs with 10 or more runs: 4
#
# Over-by-over runs:
# Over 1: 8
# Over 2: 14
# Over 3: 6
# Over 4: 11
# Over 5: 9
# Over 6: 16
# Over 7: 4
# Over 8: 12
#
# Highest runs in Over 6 (16 runs)
# Lowest runs in Over 7 (4 runs)
#
# Running total per over:
# Over 1: 8 runs | Total: 8
# Over 2: 14 runs | Total: 22
# Over 3: 6 runs | Total: 28
# Over 4: 11 runs | Total: 39
# Over 5: 9 runs | Total: 48
# Over 6: 16 runs | Total: 64
# Over 7: 4 runs | Total: 68
# Over 8: 12 runs | Total: 80
#
# Team milestones:
# 50 runs reached in Over 6
# 100 runs: not reached
# 150 runs: not reached
