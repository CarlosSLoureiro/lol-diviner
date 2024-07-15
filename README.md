# League of Legends Diviner

O League of Legends Diviner é um algoritmo simples feito com a biblioteca [LangChain](https://js.langchain.com/v0.2/docs/introduction/) e que usa embeddings de LLM para responder qual o personagem do League of Legends possui a lore mais aproximada com o prompt inserido a partir de uma busca por similaridade (busca vetorial).

## 💻 Pré-requisitos
1. Antes de começar, para executar a aplicação você precisará ter o [Docker](https://www.docker.com/) instalado em sua máquina para iniciar um servidor de banco de dados vetorial compatível com o *LangChain*.
2. Você também precisará ter o [NodeJS](https://nodejs.org/pt) v18 ou superior para iniciar a aplicação.

## 🗄️ Banco de Dados Vetorial
Em nosso caso, utilizaremos o [Milvus](https://milvus.io). E, caso você queira inspecionar melhor o banco a partir de uma interface gráfica, basta instalar o [Attu](https://milvus.io/docs/v2.0.x/attu.md).

![Attu](https://github.com/user-attachments/assets/1fa2e89f-15c8-4b65-bb21-59d92539c5fa)

### Iniciando o Milvus
Com o terminal aberto no diretório do projeto, execute o comando: `bash milvus.sh start`.

Comandos disponíveis: `bash milvus.sh restart|start|stop|delete`

## 🚀 Executando o Projeto

1. Faça uma cópia do arquivo `.env.example` para `.env` e configure com suas próprias credenciais para a LLM.
2. Instale as dependências do projeto: `npm install`.
3. Execute o comando `npm run import` para importar os embeddings da lore dos personagens para o banco de dados.
4. Execute o comando `npm start` para iniciar a aplicação.

## 👨🏻‍💻 Testando

Quando iniciar a aplicação, basta inserir prompts referentes a lore dos personagens e deixar que o algoritmo de similaridade retorne o resultado. 😉

### Exemplos de prompts:
1. `Ela é uma capitã pirata caçadora de recompensas`, a resposta esperada é que seja o personagem: **Miss Fortune**.
2. `Ele é mago que foi preso quando era mais jovem por causa de sua magia`, a resposta esperada é que seja o personagem: **Sylas**.
3. `Ele é um espadachim que vive sozinho e possui o poder do ar`, a resposta esperada é que seja o personagem: **Yasuo**.
4. `Ele é um assassino que caça monstros e odeia piratas`, a resposta esperada é que seja o personagem: **Pyke**.
5. `Ela tem o poder da luz, porém ela mantém seus poderes em segredo dos outros`, a resposta esperada é que seja o personagem: **Lux**.
6. `Ela é uma ninja assassina que odeia ser comandada`, a resposta esperada é que seja o personagem: **Akali**.

![Terminal](https://github.com/user-attachments/assets/20a6b0b1-7520-4543-8a31-ecd34698d112)

