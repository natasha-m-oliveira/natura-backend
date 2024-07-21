# Setup e Execução do Projeto

Este guia fornece instruções para configurar e iniciar o projeto utilizando Docker e Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de que você tem o Docker e o Docker Compose instalados. Você pode baixar e instalar o Docker [aqui](https://docs.docker.com/get-docker/) e o Docker Compose [aqui](https://docs.docker.com/compose/install/).

## Passo a Passo

### 1. Construir e Iniciar os Contêineres

Para construir e iniciar os contêineres, execute o seguinte comando:

```sh
sudo docker compose up --build
```

Este comando irá:
* Construir as imagens do Docker com base no Dockerfile.
* Iniciar os serviços definidos no docker-compose.yml, incluindo PostgreSQL, MongoDB e o backend da aplicação.

### 2. Configurar o Banco de Dados (Apenas na Primeira Execução)

Após o serviço app ser iniciado, você precisará acessar o contêiner do backend para configurar o banco de dados. Isso deve ser feito apenas na primeira execução do serviço. Para isso, siga os passos abaixo:

### 2.1 Acessar o Contêiner do Backend

Execute o seguinte comando para acessar o contêiner do backend:

```sh
sudo docker exec -it natura_backend /bin/sh
```

### 2.2 Executar Comandos de Configuração

Uma vez dentro do contêiner, execute os seguintes comandos para configurar o banco de dados:

```sh
npm run prisma:dbpush
npm run prisma:seed
```
* `npm run prisma:dbpush` irá aplicar as mudanças do esquema Prisma ao banco de dados.
* `npm run prisma:seed` irá popular o banco de dados com dados iniciais.

### 2.3 Reiniciar o Serviço

Após a configuração inicial, você pode reiniciar o contêiner do backend (se necessário) com:

```sh
sudo docker restart natura_backend
```

## Notas Adicionais

* **Verificação de Logs**: Para verificar os logs dos contêineres, utilize o comando:

```sh
sudo docker logs [nome_do_serviço]
```

* Exemplo para verificar os logs do backend:

```sh
sudo docker logs natura_backend
```

* **Atualizar as Imagens**: Se você fizer mudanças no Dockerfile ou no docker-compose.yml, lembre-se de reconstruir as imagens com:

```sh
sudo docker compose up --build
```
