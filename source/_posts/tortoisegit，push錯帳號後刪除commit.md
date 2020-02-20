---
title: tortoisegit，push錯帳號後刪除commit
tags:
  - 其他
  - git
categories: 其他
preview_text: 幸好目前只有我在開發這支......
abbrlink: d667
date: 2020-02-18 10:21:00
preview:
---

如題，本來自以為tortoisegit能夠根據資料夾判斷我要用的帳號推送，恩......結果是我想多了，雖然他確實能夠根據資料夾來判斷，不過不確定是哪裡有問題。

怎麼，之前沒權限不是不能push到master嗎？還是此權限非彼權限？
然後看Pipeline的是有權限的帳號，但是commit是沒權限的帳號，還有這種奇葩的操作？
明明是直接點commit&push的耶，不過這隻程式現在只有我開發才敢試試看就是了。

google了一下 Revert、Rebase、Reset哪個才能達到我要的目的
畢竟要讓已經push上去的commit消失，那麼Revert就不適合了
因為還是看的到誰用自己的帳號推送= =

Rebase？看各種文章的解釋，感覺還是可以被翻出來

那就只剩下Reset了呢，雖然google了一下，Reset的commit其實還是可以還原???

不過呢，管他的，只要看不出來有用私人帳號推送過就行啦！

用tortoisegit操作很簡單，備份修改資料 -> show log 或 history ->
找上一個版本 -> Reset to this -> 模式選hard -> 還原成功~~ ->
把修改過的資料覆蓋回去 -> commit&push -> 打勾force overwrite的選項

毀屍滅跡了！

對了，因為我是直接推master所以有保護，不能直接用force強制推送，那時就要去gitlab上找
Protected Branches 暫時移除保護，但是只有看了一下，只有Maintainer跟Owner有權限移除，Developer似乎沒有權限看到setting選項，真的有保護的話，那應該就只能去找維護者了，但既然你都不是維護者的話，也不太可能直接在master推送就是了

不過這也只適合別人還沒有pull這個branch
畢竟，多了那條紀錄，肯定會有奇怪的衝突，但是開issue就沒差了
