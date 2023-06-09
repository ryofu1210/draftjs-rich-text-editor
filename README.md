# 概要
Draft.jsを使ったリッチテキストエディタ

![リッチテキストエディタデモ動画 mov](https://user-images.githubusercontent.com/40624966/233601713-52af2572-f01a-4586-921f-8d9b6cffc53c.gif)


## ページ一覧
- Post一覧(/)
- Post新規作成(/posts/new)
- Post編集(/posts/:id)

## テキストエディタでできること
- ブロックタイプの変更
  - 見出しH1, H2, H3の変更
  - 箇条書き(インデント変更可)
  - 順序付きリスト(インデント変更可)
  - 引用
- インラインスタイル変更
  - BOLD
  - 下線
  - 取り消し線
  - 文字色
    - 赤
    - 青
    - 黄
    - グレー
    - デフォルト
- URLのリンク有効化

# 環境構築手順
```shell
docker-compose up -d
npx prisma migrate deploy
npm run dev
```

`http://localhost:4003`にアクセス
