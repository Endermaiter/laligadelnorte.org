import subprocess
from datetime import datetime


current_date= datetime.now().strftime("%d/%m/%Y - %H:%M")

subprocess.run("git add *", shell=True)
subprocess.run(f'git commit -m "Auto push {current_date}"', shell=True)
current_branch = subprocess.run("git branch --show-current", shell=True, capture_output=True, text=True)
subprocess.run(f"git push origin {current_branch}", shell=True)

print("\n✅ | Commit pushed!\n")