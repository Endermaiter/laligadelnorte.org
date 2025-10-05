import subprocess
from datetime import datetime


current_date= datetime.now().strftime("%d/%m/%Y - %H:%M")

subprocess.run("git add *", shell=True)
subprocess.run(f'git commit -m "Auto push {current_date}"')
subprocess.run("git push origin master", shell=True)