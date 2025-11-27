import subprocess
import re
import json
import time
from datetime import datetime
from pyfiglet import Figlet
from colorama import Fore, Style
        
def main():
    """
    
    """
    
    show_menu()
    
    option = input (f"\n\tSelect Option => {Style.BRIGHT}{Fore.YELLOW}")
    print(f"{Style.RESET_ALL}", end="")
    
    match option:
        case "1":
            main()
        case "2":
            main()
        case "3":
            update_scores()
            main()
        case "4":
            main()
        case "5":
            push_all()
            main()
        case "6":
            print_exit()
            exit()
            

def show_menu():
    """
    
    """
    clear_console()
    print(Figlet().renderText("LLN  Manager"))
    
    menu = {
    "[ 1 ] | Add match",
    "[ 2 ] | Modify match",
    "[ 3 ] | Update Scores",
    "[ 4 ] | Add new",
    "[ 5 ] | Push All",
    "[ 6 ] | Exit (Ctrl+C)" 
    }
    
    for option in sorted(menu):
        pattern = re.compile(r"\[\s*(\d+)\s*\]")
        highlighted = pattern.sub(lambda m: f"[ {Fore.YELLOW}{Style.BRIGHT}{m.group(1)}{Style.RESET_ALL} ]", option)
        print(f"\t{highlighted}")


def show_title():
    """
    
    """
    print(Figlet().renderText("LLN  Manager"))

def update_scores():
    """
    
    """
    clear_console()
    show_scores()
    input()
    
def show_scores():
    """
    
    """
    show_title()
    with open("data/scores.json", "r", encoding="utf-8") as score_files:
        score_list = json.load(score_files)

    score_list_sorted = sorted(score_list, key=lambda team: team['score'], reverse=True)
    for team in score_list_sorted:
        print(f"\t· {Style.BRIGHT}{Fore.MAGENTA}{team['name']} - {Style.BRIGHT}{Fore.BLUE}{team['score']}{Style.RESET_ALL}")
        

def push_all():
    """
    
    """
    current_date= datetime.now().strftime("%d/%m/%Y - %H:%M:%S")

    subprocess.run("git add *", shell=True)
    subprocess.run(f'git commit -m "Auto push {current_date}"', shell=True, capture_output=True)
    current_branch = subprocess.run(["git", "branch", "--show-current"], capture_output=True, text=True)
    push_output = subprocess.run(f"git push origin {current_branch.stdout}", shell=True, capture_output=True)

    if push_output.returncode == 0:
        print_succeed(f"Push succeed on branch {current_branch.stdout.strip()}!")
    else:
        print_error("Push failed!")
    time.sleep(1)
    print("Comming back to the menu in 3")
    time.sleep(1)
    print("Comming back to the menu in 2")
    time.sleep(1)
    print("Comming back to the menu in 1")
    time.sleep(1)
        
def print_exit():
    """
    
    """
    print(f"\n\t{Style.BRIGHT}{Fore.RED}[Exiting]{Style.RESET_ALL}\n")
    
def print_error(msg:str):
    """
    
    """
    print(f"\n\t{Style.BRIGHT}{Fore.RED}❌  | {msg}{Style.RESET_ALL}\n")
    
def print_succeed(msg:str):
    """
    
    """
    print(f"\n\t{Style.BRIGHT}{Fore.GREEN}✅  | {msg}{Style.RESET_ALL}\n")

def clear_console():
    """
    
    """
    subprocess.run("cls", shell=True)
        
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print_exit()
        exit()
    