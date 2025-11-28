import subprocess
import re
import json
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
    
    with open("data/scores.json", "r", encoding="utf-8") as score_files:
        score_dict = json.load(score_files)
    score_dict_sorted = sorted(score_dict, key=lambda team: team['score'], reverse=True)
    team_list = []
    for team in score_dict_sorted:
        team_list.append(team['name'])
    
    show_scores(score_dict_sorted)
    
    action = input("\t[V] Add Victory / [D] Add Defeat => ")
    if action.lower() != "v" and action.lower() != "d":
        input("Invalid action. Enter to try again...")
        update_scores()
    selected_team = int(input("Select team from list => "))
    if selected_team not in range(1, len(score_dict_sorted)+1):
        input("Invalid number team. Enter to try again...")
        update_scores()
    added_score = 2 if action.lower() == "v" else 1
    score_dict_sorted[selected_team+1]['score'] = score_dict_sorted[selected_team+1]['score'] + added_score
    
    with open("data/scores.json", "w", encoding="utf-8") as f:
        json.dump(score_dict_sorted, f, indent=4, ensure_ascii=False)
    
def show_scores(scores: dict):
    """
    
    """
    show_title()
    index = 1
    for team in scores:
        print(f"\t[ {Style.BRIGHT}{Fore.YELLOW}{index}{Style.RESET_ALL} ] {Style.BRIGHT}{Fore.MAGENTA}{team['name']} - {Style.BRIGHT}{Fore.BLUE}{team['score']}{Style.RESET_ALL}")
        index +=1
    print("")
        

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
    input("\tPress enter to continue...")
        
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
    