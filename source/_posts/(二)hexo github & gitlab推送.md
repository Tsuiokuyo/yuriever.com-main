---

title: (二)hexo github & gitlab推送
date: 2018-12-29 00:00:00
tags: hexo

categories: hexo
preview: https://i.imgur.com/Q9gk4TW.jpg
preview_text: 拋棄前一個部落格 https://dragonmuc.github.io/<br/>跑來這邊重新做一個@@

---

# (二)hexo github & gitlab 推送



> **這篇文章的瑕疵很多，如果沒有必要，最好去找其他人的文章比較好，因為我的部屬方法根本是自找麻煩，我最終的目的是要在使用netlify部屬Hexo，老實說，就目前來說netlify給的服務我基本上都用不到，大概只用到CDN而已，就把架hexo弄得有點複雜...。**



這部分應該有小問題，本來想透過Git同時推送，不過我發現我的步驟有問題，

後來找到更簡易的方法，但是本來的步驟也沒有修改掉，所以有一些步驟可能是多餘的。



GitLab -> New project

Project name輸入 你的帳號.gitlab.io



github -> New repository

Repository name 輸入 你的帳號.github.io



#### 設定git config

```
git config --global user.name "你的帳號"
git config --global user.email "你的Email"
```

#### 建立ssh金鑰

```
mkdir .ssh
cd ~/.ssh
ssh-keygen -t rsa -C "你的Email"
```

出現訊息

```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/user/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

建議三次都直接enter，以防密碼忘記

建立Public key、Private key兩個檔案

id_rsa為Private key

id_rsa.pub為Public key

預設路徑為

`C:\Users\USER\.ssh`

複製公鑰至Github及Gitlab

```
cat ~/.ssh/id_rsa.pub | pbcopy
```



gitlab -> settings -> SSH Keys

github -> settings -> SSH and GPG keys ->New SSH keys

貼上公鑰後 Title隨意輸入



#### 回到Git Bash 測試

`ssh -T git@gitlab.com`

```
The authenticity of host 'gitlab.com (XXX.XXX.XXX.XXX)' can't be established.
ECDSA key fingerprint is SHA256:HbW3g8zUjNSksFbqTiUWPWg2Bq1x8xdGUrliXFzSnUw.
Are you sure you want to continue connecting (yes/no)? (輸入yes)

Warning: Permanently added 'gitlab.com,XXX.XXX.XXX.XXX' (ECDSA) to the list of known hosts.
Welcome to GitLab, @Tsuiokuyo!

```

`ssh -T git@github.com`

```
The authenticity of host 'github.com (XXX.XXX.XXX.XXX)' can't be established.
RSA key fingerprint is SHA256:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
Are you sure you want to continue connecting (yes/no)? (輸入yes)

Warning: Permanently added 'github.com,XXX.XXX.XXX.XXX' (RSA) to the list of known hosts.
Hi Tsuiokuyo! You've successfully authenticated, but GitHub does not provide shell access.

```



#### 申請GitHub Personal access tokens

GitHub -> settings ->Developer settings ->Personal access tokens

選項全選，創建完成代碼需記錄下來



#### 設定.gitlab-ci.yml

```
image: node:10.15.0

pages:
  cache:
    paths:
    - node_modules/

  script:
  - npm install hexo-cli -g
  - npm install hexo-generator-feed --save
  - npm install
  - hexo g
  - cd ./public
  - git init
  - git config --global user.email "github email"
  - git config --global user.name "github帳號"  
  - git config --global push.default simple
  - git add .
  - git commit -m "auto-deploy" 
  - git push --force --quiet --set-upstream https://Personal access tokens@github.com/github帳號/github帳號.github.io.git master ## github地址
  artifacts:
    paths:
    - public
  only:
  - master
```

其中Personal access tokens需修改成剛剛申請的代碼，帳號跟email打好。

這階段需要確實輸入，不然會發現github沒有反應。



#### 設定.gitignore

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
package-lock.json
```

沒有必要推送到gitlab上的東西就不推送了。



#### 推送 HEXO 到gitlab

```
git add .
git commit -m "HEXO"
git push -u origin master
```



這次重新架設hexo就遇到了一堆莫名其妙的問題，要看預覽畫面的時候，網頁整片空白，找了一下發現theme無法推送上去，不然就是無法推送到github，之前用Github+HEXO ARIA主題的時候明明沒那麼多問題...。

拖比較長時間的大概是以下兩點

##### 遇到沒有權限推送git

you are not allowed to push code to protected branches on this project”?

`gitlab -> settings -> Repository -> Protected Branches`



##### theme資料夾無法推送

方案一： 簡單粗暴解決
直接刪掉theme中的.git文件夾，將theme當成普通的文件加入到版本控制當中，但是這樣操作之後無法更新主題。

(這方法對我無效)



方案二： subtree
首先需要在自己的github上fork一份next原始碼

接著會在自己的github Repositories中多出一個同名項目

移除自己的theme資料夾

```
rm theme/gal
```

添加subtree

```
 # git remote add -f <子倉庫名> <子倉庫地址>
$ git remote add -f next git@github.com:Tsuiokuyo/hexo-theme-gal.git

# git subtree add --prefix=<子目錄名> <子倉庫名> <分支> --squash
$ git subtree add --prefix=themes/gal gal master --squash
```



```
# git subtree push --prefix=<子目錄名> <遠程分支名> 分支
$ git subtree push --prefix=themes/gal gal master  

# git subtree pull --prefix=<子目錄名> <遠程分支名> 分支
$ git subtree pull --prefix=themes/Tsuiokuyo Tsuiokuyo master  --squash
```

至此 我loop了好幾次一樣出現問題都無法上傳

然後輸入了

```
git subtree add --prefix=themes/gal gal master --squash
git commit -m 'ggal'
git push -u origin master
```

就莫名其妙可以上傳了，最後還是不知道是因為哪個步驟解決的。

結果大約半小時可以完成的hexo架設，我花了半天的時間...。



參考資料：

[sleepym09](http://sleepym09.com/2018/08/24/Hexo%E5%A4%9A%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%90%8C%E6%AD%A5%E9%97%AE%E9%A2%98/)

[frenlee](https://blog.frenlee.com/2016/11/hexo-gitlab-ci/)

[只是個打字的](https://blog.typeart.cc/Git%E5%9F%BA%E7%A4%8E%E8%A8%AD%E5%AE%9A/)

