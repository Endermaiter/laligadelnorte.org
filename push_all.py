import subprocess
from datetime import datetime


current_date= datetime.now().strftime("%d/%m/%Y - %H:%M")

subprocess.run("git add *", shell=True)
subprocess.run(f'git commit -m "Auto push {current_date}"', shell=True)
current_branch = subprocess.run(["git", "branch", "--show-current"], capture_output=True, text=True)
push_output = subprocess.run(f"git push origin {current_branch.stdout}", shell=True)

if push_output.returncode == 0:
    print("\n✅ | Push succeed!\n")
else:
    print("\n❌ | Push failed!\n")