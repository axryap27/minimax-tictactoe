# Tic Tac Toe Game

import random

# Global variables (I know global variables are bad but it's easier for now)
board = [[" " for x in range(3)] for x in range(3)]  # 3x3 board
current_player = "X"  # X goes first
game_mode = ""  # Will store "1" for two players or "2" for computer
player_symbol = "X"  # Will store player's chosen symbol
computer_symbol = "O"  # Will store computer's symbol
difficulty = "medium"  # Will store "easy", "medium", or "hard"

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

def evaluate_board():
    # Evaluate the board for minimax
    # Returns 10 if computer wins, -10 if player wins, 0 for tie
    if check_winner():
        if current_player == computer_symbol:
            return 10
        else:
            return -10
    return 0

def minimax(depth, is_maximizing):
    # Minimax algorithm implementation
    score = evaluate_board()
    
    # If game is over, return the score
    # Does not use ties since this is ideal steadystate for tictactoe
    if score != 0:
        return score
    
    # If board is full, it's a tie
    if is_board_full():
        return 0
    
    if is_maximizing:
        best_score = float('-inf')
        for i, j in get_empty_spots():
            board[i][j] = computer_symbol
            score = minimax(depth + 1, False)
            board[i][j] = " "
            best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i, j in get_empty_spots():
            board[i][j] = player_symbol
            score = minimax(depth + 1, True)
            board[i][j] = " "
            best_score = min(score, best_score)
        return best_score

def get_best_move():
    # Find the best move using minimax
    best_score = float('-inf')
    best_move = None
    
    for i, j in get_empty_spots():
        board[i][j] = computer_symbol
        score = minimax(0, False)
        board[i][j] = " "
        
        if score > best_score:
            best_score = score
            best_move = (i, j)
    
    return best_move

def computer_move():
    if difficulty == "hard":
        # Use minimax for hard difficulty
        return get_best_move()
    
    # Medium difficulty logic (70% strategic, 30% random)
    if random.random() < 0.7:
        # First, check if computer can win
        for i in range(3):
            # Check rows
            row = board[i]
            win_pos = check_line(row, computer_symbol)
            if win_pos != -1:
                return i, win_pos
            
            # Check columns
            col = [board[j][i] for j in range(3)]
            win_pos = check_line(col, computer_symbol)
            if win_pos != -1:
                return win_pos, i
        
        # Check diagonals
        diag1 = [board[i][i] for i in range(3)]
        win_pos = check_line(diag1, computer_symbol)
        if win_pos != -1:
            return win_pos, win_pos
        
        diag2 = [board[i][2-i] for i in range(3)]
        win_pos = check_line(diag2, computer_symbol)
        if win_pos != -1:
            return win_pos, 2-win_pos
        
        # Then, check if need to block player
        for i in range(3):
            # Check rows
            row = board[i]
            block_pos = check_line(row, player_symbol)
            if block_pos != -1:
                return i, block_pos
            
            # Check columns
            col = [board[j][i] for j in range(3)]
            block_pos = check_line(col, player_symbol)
            if block_pos != -1:
                return block_pos, i
        
        # Check diagonals for blocking
        diag1 = [board[i][i] for i in range(3)]
        block_pos = check_line(diag1, player_symbol)
        if block_pos != -1:
            return block_pos, block_pos
        
        diag2 = [board[i][2-i] for i in range(3)]
        block_pos = check_line(diag2, player_symbol)
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

def select_symbol():
    while True:
        try:
            symbol = input("Choose your symbol (X or O): ").upper()
            if symbol in ["X", "O"]:
                return symbol
            print("Please enter X or O!")
        except:
            print("Invalid input! Please enter X or O.")

def select_difficulty():
    while True:
        try:
            print("\nSelect difficulty level:")
            print("1. Easy (Random moves)")
            print("2. Medium (70% strategic, 30% random)")
            print("3. Hard (Unbeatable)")
            diff = input("Enter 1, 2, or 3: ")
            if diff == "1":
                return "easy"
            elif diff == "2":
                return "medium"
            elif diff == "3":
                return "hard"
            print("Please enter 1, 2, or 3!")
        except:
            print("Invalid input! Please enter 1, 2, or 3!")

def reset_game():
    global board, current_player, winner
    board = [[" " for x in range(3)] for x in range(3)]
    current_player = "X"  # X always goes first

def main():
    global current_player, game_mode, player_symbol, computer_symbol, difficulty
    
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
    
    # If playing against computer, let player choose their symbol and difficulty
    if game_mode == "2":
        player_symbol = select_symbol()
        computer_symbol = "O" if player_symbol == "X" else "X"
        difficulty = select_difficulty()
    
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
        if game_mode == "1" or current_player == player_symbol:
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
            if game_mode == "2" and current_player == computer_symbol:
                print("Computer wins! 😢")
            else:
                print(f"Player {current_player} wins! 🎉")
            
            # If playing against computer, ask to play again
            if game_mode == "2":
                print("\nPlay again? (y/n)")
                while True:
                    try:
                        play_again = input().lower()
                        if play_again in ["y", "n"]:
                            break
                        print("Please enter y or n!")
                    except:
                        print("Invalid input! Please enter y or n!")
                
                if play_again == "y":
                    # Let player choose symbol and difficulty again
                    player_symbol = select_symbol()
                    computer_symbol = "O" if player_symbol == "X" else "X"
                    difficulty = select_difficulty()
                    reset_game()
                    continue
                else:
                    print("\nThanks for playing! Goodbye! 👋")
                    break
            else:
                break
        
        # Check for tie
        if is_board_full():
            print_board()
            print("It's a tie! 😕")
            
            # If playing against computer, ask to play again
            if game_mode == "2":
                print("\nPlay again? (y/n)")
                while True:
                    try:
                        play_again = input().lower()
                        if play_again in ["y", "n"]:
                            break
                        print("Please enter y or n!")
                    except:
                        print("Invalid input! Please enter y or n!")
                
                if play_again == "y":
                    # Let player choose symbol and difficulty again
                    player_symbol = select_symbol()
                    computer_symbol = "O" if player_symbol == "X" else "X"
                    difficulty = select_difficulty()
                    reset_game()
                    continue
                else:
                    print("\nThanks for playing! Goodbye! 👋")
                    break
            else:
                break
        
        # Switch players
        if current_player == "X":
            current_player = "O"
        else:
            current_player = "X"

if __name__ == "__main__":
    main()