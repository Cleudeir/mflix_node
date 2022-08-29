sudo apt-get -y update  --fix-missing

sudo apt-get install -y curl  --fix-missing

# nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" >> ~/.bashrc
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"   >> ~/.bashrc
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" >> ~/.profile
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"   >> ~/.profile
source ~/.bashrc
source ~/.profile
apt-get update && apt-get install -y --fix-missing libatomic1 
nvm install 16
nvm use 16
#--
# Git 
sudo apt install git-all -y
git --version
# pm2
npm install pm2@latest -g -y
#--
