# Tic Tac Toe Game

import random

# Global variables (I know global variables are bad but it's easier for now)
board = [[" " for x in range(3)] for x in range(3)]  # 3x3 board
current_player = "X"  # X goes first
game_mode = ""  # Will store "1" for two players or "2" for computer

def print_board():
    # Print the board in a nice format
    print("\n")
    for i in range(3):
        print(" " + board[i][0] + " | " + board[i][1] + " | " + board[i][2])
        if i < 2:  # Don't print line after last row
            print("-----------")
    print("\n")

def check_winner():
    # Check rows
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] != " ":
            return True
    
    # Check columns
    for i in range(3):
        if board[0][i] == board[1][i] == board[2][i] != " ":
            return True
    
    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] != " ":
        return True
    if board[0][2] == board[1][1] == board[2][0] != " ":
        return True
    
    return False

def is_board_full():
    # Check if board is full
    for i in range(3):
        for j in range(3):
            if board[i][j] == " ":
                return False
    return True

def get_empty_spots():
    # Returns list of empty spots as (row, col) tuples
    empty_spots = []
    for i in range(3):
        for j in range(3):
            if board[i][j] == " ":
                empty_spots.append((i, j))
    return empty_spots

def check_line(line, player):
    # Check if a line (row, column, or diagonal) has two of player's marks and one empty
    if line.count(player) == 2 and line.count(" ") == 1:
        return line.index(" ")
    return -1

def computer_move():
    # 70% chance to make a strategic move
    if random.random() < 0.7:
        # First, check if computer can win
        for i in range(3):
            # Check rows
            row = board[i]
            win_pos = check_line(row, "O")
            if win_pos != -1:
                return i, win_pos
            
            # Check columns
            col = [board[j][i] for j in range(3)]
            win_pos = check_line(col, "O")
            if win_pos != -1:
                return win_pos, i
        
        # Check diagonals
        diag1 = [board[i][i] for i in range(3)]
        win_pos = check_line(diag1, "O")
        if win_pos != -1:
            return win_pos, win_pos
        
        diag2 = [board[i][2-i] for i in range(3)]
        win_pos = check_line(diag2, "O")
        if win_pos != -1:
            return win_pos, 2-win_pos
        
        # Then, check if need to block player
        for i in range(3):
            # Check rows
            row = board[i]
            block_pos = check_line(row, "X")
            if block_pos != -1:
                return i, block_pos
            
            # Check columns
            col = [board[j][i] for j in range(3)]
            block_pos = check_line(col, "X")
            if block_pos != -1:
                return block_pos, i
        
        # Check diagonals for blocking
        diag1 = [board[i][i] for i in range(3)]
        block_pos = check_line(diag1, "X")
        if block_pos != -1:
            return block_pos, block_pos
        
        diag2 = [board[i][2-i] for i in range(3)]
        block_pos = check_line(diag2, "X")
        if block_pos != -1:
            return block_pos, 2-block_pos
        
        # If center is empty, take it
        if board[1][1] == " ":
            return 1, 1

    # 30% chance to make a random move, or if no strategic move was found
    empty_spots = get_empty_spots()
    if empty_spots:
        return random.choice(empty_spots)

def get_move():
    # Get player move
    while True:
        try:
            move = input(f"Player {current_player}, enter your move (1-9) or 'q' to quit: ")
            
            # Check for quit
            if move.lower() == 'q':
                print("\nThanks for playing! Goodbye! 👋")
                exit()
            
            move = int(move)
            if move < 1 or move > 9:
                print("Please enter a number between 1 and 9!")
                continue
            
            # Convert number to row and column
            row = (move - 1) // 3
            col = (move - 1) % 3
            
            # Check if spot is empty
            if board[row][col] != " ":
                print("That spot is already taken! Try again.")
                continue
            
            return row, col
            
        except ValueError:
            print("Please enter a valid number or 'q' to quit!")

def main():
    global current_player, game_mode  # Need to use global variables
    
    print("Welcome to Tic Tac Toe!")
    print("Choose game mode:")
    print("1. Two Players")
    print("2. Play against Computer")
    
    while True:
        try:
            game_mode = input("Enter 1 or 2: ")
            if game_mode in ["1", "2"]:
                break
            print("Please enter 1 or 2!")
        except:
            print("Invalid input! Please enter 1 or 2.")
    
    print("\nPositions are numbered like this:")
    print(" 1 | 2 | 3 ")
    print("-----------")
    print(" 4 | 5 | 6 ")
    print("-----------")
    print(" 7 | 8 | 9 ")
    print("\nLet's play!\n")
    
    while True:
        print_board()
        
        # Get move based on game mode
        if game_mode == "1" or current_player == "X":
            # Human player's turn
            row, col = get_move()
        else:
            # Computer's turn
            print("Computer is thinking...")
            row, col = computer_move()
        
        # Make move
        board[row][col] = current_player
        
        # Check for winner
        if check_winner():
            print_board()
            if game_mode == "2" and current_player == "O":
                print("Computer wins! 😢")
            else:
                print(f"Player {current_player} wins! 🎉")
            break
        
        # Check for tie
        if is_board_full():
            print_board()
            print("It's a tie! 😕")
            break
        
        # Switch players
        if current_player == "X":
            current_player = "O"
        else:
            current_player = "X"

if __name__ == "__main__":
    main()