git  
分布式 版本控制系统


ls  列出目录 -a
cd 进入目录 ./ ../

touch 新建
tab 命令补全
vi 编辑器 i插入 esc推出插入 :wq保存并退出 vim
cat 查看文件内容
clear 清除



git --version  查看版本号
git --help  查看帮助


git init  U

# 添加文件
git add readme.md  A
git add . 添加所有文件

# 提交文件
git commit -m "wrote a readme file" 


# 配置用户信息
git config --global user.email "you@example.com"
git config --global user.name "Your Name" 


U A M-2
git status


git log
git log --pretty=oneline



工作区 暂存区 仓库区


git restore <file>...  撤销工作区

git restore --staged <file>  撤销暂存区



首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

# 强制刷新工作区 版本回退4c459b0
git reset --hard HEAD^ （代表上一个版本号）
git reset --hard 573a483ab9973

# 查询所有记录
git reflog


# github 注册

# 本地生成ssh key
$ ssh-keygen -t rsa -C "nicholas@example.com"

# github 配置公钥

# 创建远程仓库

# 远程仓库地址
git@github.com:FindIndex/test.git


# 关联远程仓库
git remote add origin git@github.com:FindIndex/test.git

# 推送到远程仓库
git push -u origin master

# 从远程仓库初始化 克隆
git clone



gitpage

# 特殊的仓库名 
findindex.github.io
username.github.io

根目录 默认首页 index.html
https://findindex.github.io/

https://findindex.github.io/meiyan/index.html
https://findindex.github.io/meiyan/