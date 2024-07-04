# MEC Registry App

# Abstract

ステップごとの　Ethereum、TypeScript、React　のフロントエンドを学んでいきます。

# Prerequisites / 前提条件

Before you begin, ensure you have met the following requirements:
このプロジェクトを始める前に、以下の要件を満たしていることを確認してください：

- **Node.js**: 
  You need Node.js installed to run this project. You can download it from [Node.js official website](https://nodejs.org/).
  このプロジェクトを実行するにはNode.jsがインストールされている必要があります。[Node.jsの公式ウェブサイト](https://nodejs.org/)からダウンロードできます。
- **Git**: 
  リポジトリをクローンするためにGitがインストールされている必要があります。[Gitのウェブサイト](https://git-scm.com/downloads)で指示に従ってインストールしてください。
  Git must be installed to clone the repository. Instructions are available on the [Git website](https://git-scm.com/downloads).

- **Foundry**:
  
  [こちら](https://github.com/airinterface/ethereum101/blob/main/doc/Step11.md)に沿って、FoundryをInstallしてください。

  Follow [this](https://github.com/airinterface/ethereum101/blob/main/doc/Step11.md) instruction to install Foundry

  Contract で必要なライブラリをInstallしてください。/ install required files. 

  ```
  forge install --no-commit OpenZeppelin/openzeppelin-contracts
  forge install --no-commit forge-std
  ```
## Contractのテスト　 / Testing Contract 

  ```
  cd contract
  forge test
  ```

## インストール方法

**mec-registry-app**をインストールするには、以下の手順に従ってください。

Follow below instruction to setup.


1. **リポジトリをクローンする / Clone repository**
   ```bash
   git clone git@github.com:MicroEdgeCerts/mec-registry-app.git
   cd mec-registry-app
   ```


3. **依存関係をインストールする**


    今の依存ライブラリをインストール


    install current dependencies


    ```

    npm install
    ```



## ローカルでの実行方法

1.　ローカルChainを起動 anvil ・ Start the local chain anvil
ローカルでプロジェクト名を実行するには、以下のコマンドをターミナルで実行します。
See work in dev enironment, type below command in terminal

    ```
    npm run anvil
    ```

    プライベートアドレス（１）を取得 / retrieve Private address(1)



2.　ContractをDeploy /  Deploy the Contract 

    .env に下記を記入

    Get the private Address (1)

    write .env below

    ```
    FORGE_PRIVATE_KEY=<Private Key Here>
    RPC_URL=http://127.0.0.1:8545
    ```

   でDeployします。

    ```
   npm run deploy
    ```

    
    すると、Deployされたアドレスが出力されます。
    
    （Anviｌだと、ここがいつも、0x5fbdb2315678afecb367f032d93f642f64180aa3　）そのアドレスをコピーします。

    Once you run the command, the address of the contract will be displayed. Keep that for the next step. ( with Anvil, it always be 0x5fbdb2315678afecb367f032d93f642f64180aa3
    )

    はじめのものが、IssuerRegistry,次のアドレスがAchievementCredentialRegistryとなります。
    どちらとも、コントラクトアドレスをピックアップし、それぞれ、FORGE_ISSUER_CONTRACT_ADDRESS, FORGE_ACHIEVEMENT_CONTRACT_ADDRESS

3.　ContractをBuild ABIを取得/ Build Contract and get the ABI
   プライベートアドレス（１）を取得

    .env に下記を記入

    Get the private Address (1)

    write .env below

    ```
    FORGE_PRIVATE_KEY=<Private Key Here>
    RPC_URL=http://127.0.0.1:8545
    FORGE_ISSUER_CONTRACT_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    FORGE_ACHIEVEMENT_CONTRACT_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    ```

    この設定でWagmiのインターフェースとタイプを生成します。

    With this configuration, generates wagmi interface and type

    ```
    npm run prepareAbi
    ```
 



ステップ１,2, 3は
For step 1, 2, 3

Click this link [http://localhost:3000](http://localhost:3000)
[http://localhost:3000](http://localhost:3000) に行きましょう。


4. Other environment variable. 

Signする際に必要な、
```
SECRET_COOKIE_PASSWORD　<- ３２文字以上　・　minimum 32 characters
```


4. Start up the app / アプリを立ち上げる

```
npm run dev
```



App: React / NextJS / TypeScript
Style: tailwindCSS / SCSS / AutoPlexer


