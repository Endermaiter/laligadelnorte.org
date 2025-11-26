import subprocess
from datetime import datetime
from pyfiglet import Figlet
from colorama import Fore, Style
        
def main():
    
    show_menu()
    
    option = input ("\n\tSelect Option => ")
    
    match option:
        case "1":
            print("TBD")
        case "2":
            print("TBD")
        case "3":
            push_all()
        case "4":
            print_exit()
            exit()
    

def show_menu():
    
    clear_console()
    print(Figlet().renderText("LLN  Manager"))
    
    menu = {
    "1. [TBD]",
    "2. [TBD]",
    "3. Push All",
    "4. Exit (Use Ctrl+C to exit wherever)" 
    }
    
    for option in sorted(menu):
        print(f"\t{option}")

def push_all():
    current_date= datetime.now().strftime("%d/%m/%Y - %H:%M:%S")

    subprocess.run("git add *", shell=True)
    subprocess.run(f'git commit -m "Auto push {current_date}"', shell=True, capture_output=True)
    current_branch = subprocess.run(["git", "branch", "--show-current"], capture_output=True, text=True)
    push_output = subprocess.run(f"git push origin {current_branch.stdout}", shell=True, capture_output=True)

    if push_output.returncode == 0:
        print_succeed("Push succeed!")
    else:
        print_error("Push failed!")    
        
def print_exit():
    print(f"\n\t{Style.BRIGHT}{Fore.RED}[Exiting]{Style.RESET_ALL}\n")
    
def print_error(msg:str):
    print(f"\n\t{Style.BRIGHT}{Fore.RED}❌  | {msg}{Style.RESET_ALL}\n")
    
def print_succeed(msg:str):
    print(f"\n\t{Style.BRIGHT}{Fore.GREEN}✅  | {msg}{Style.RESET_ALL}\n")

def clear_console():
    subprocess.run("cls", shell=True)
        
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print_exit()
        exit()
    