# Tic Tac Toe Game


# Global variables (I know global variables are bad but it's easier for now)
board = [[" " for x in range(3)] for x in range(3)]  # 3x3 board
current_player = "X"  # X goes first

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

def get_move():
    # Get player move
    while True:
        try:
            move = int(input(f"Player {current_player}, enter your move (1-9): "))
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
            print("Please enter a valid number!")

def main():
    global current_player  # Need to use global variable
    
    print("Welcome to Tic Tac Toe!")
    print("Positions are numbered like this:")
    print(" 1 | 2 | 3 ")
    print("-----------")
    print(" 4 | 5 | 6 ")
    print("-----------")
    print(" 7 | 8 | 9 ")
    print("\nLet's play!\n")
    
    while True:
        print_board()
        
        # Get player move
        row, col = get_move()
        
        # Make move
        board[row][col] = current_player
        
        # Check for winner
        if check_winner():
            print_board()
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