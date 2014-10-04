simple-pokedex-v2
=================

rebuild by koa, gulp, es6, webpack, etc..


# TODO
- [ ] デーモン化するとこ
  - [ ] [pm2](https://github.com/Unitech/pm2)でやってみる
- [ ] 存在しないidのときとか、いわゆる例外処理

# Enhance
- [ ] 既にわかってるメガシンカ/ゲンシカイキ/その他いないやつ(ディアンシー)を追加する
  - [ ] データの追加
  - [ ] はてなマークをスプライトに
  - [ ] unknownフラグと出し分け
- [ ] わざを検索できるように
  - [x] {``http://pokeapi.co/api/v1/pokemon/{nationalPokedexNumber}``}をローカルから叩いて、``move``だけに整形するスクリプト
  - [x] それ叩いた結果を``key``で引ける形のオブジェクトに
  - [ ] カロスポケのわざデータ
  - [ ] わざ名の英和辞書(効果はできればでok)
- [ ] ES6っぽくする(let, const, defineProp, etc..)
  - [ ] Data系はconstに
