# Auction

> Front-end application using react made as an MVP of a fake Auction website

## Installation and Start

```js
npm install
npm start
```

## Enunciado

Considere que você foi designado para uma equipe de desenvolvimento responsável por criar uma aplicação web de leilão online. Inicialmente você deverá produzir produto mínimo viável (MVP), ou seja, uma versão minimamente viável e funcional do projeto para validação de pessoas envolvidas. Neste MVP, você deverá criar a estrutura da aplicação backend e frontend e definições como: frameworks, design patterns (se necessário), camada de persistência de dados, regras de negócios, testes unitários, uma camada de exposição de serviços via API REST e interface gráfica independente (Single Page Application). Apesar deste MVP possuirem diversos requisitos para este desafio você deverá satisfazer somente os requisitos abaixo:
 
### Requisitos:

As seguintes funcionalidades são requeridas para o novo sistema:

- Login:    
    - Função: autenticação na aplicação para acesso as funcionalidades 
    - Campos: usuário, senha
    - Restrições: 
        - Todos os campos são obrigatórios
        - Usuários desativados não poderão acessar o sistema

- Logout:   
    - Função: logoff da aplicação
    - Restrições:
        - Nenhum serviço pode ser acessado após o logout da aplicação

- Cadastro de leilão (CRUD):
    - Função: Cadastrar/Visualizar/Editar e Excluir novos leilões
    - Campos: nome do leilão, valor inicial, indicador se o item leiloado é "usado", usuário responsável pelo leilão, data de abertura e finalização
    - Restrições: 
        - Todos os campos são obrigatórios
                
- Listagem de leilões
     - Função: Listar todos os leilões existentes
     - Campos: nome do leilão, valor inicial, indicador se o item leiloado é "usado" e usuário responsável pelo leilão, indicador se o leilão está foi finalizado    



### Orientações:

Você é livre para escolher quaisquer tecnologias/linguagens/frameworks desde que dentro do conceito de desenvolvimento web. Escolha a opção com a qual se sentir mais confortável e que seja aderente à solução que se deseja criar. Você terá a oportunidade de justificar as suas escolhas. 

Inclua um arquivo README.md em seu projeto, com informações de com instruções de como executá-lo.

Nós não iremos avaliá-lo pelo número de linhas de código que você escrever, mas pela qualidade total do seu trabalho. 

Para realizar a entrega de seu desafio, faça um upload do seu projeto no github, ou em qualquer repositório de código à sua escolha.