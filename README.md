# Web Service do App "Precisava?"

![Logo, Precisava?](/public/img/precisava.png)

Web Service que disponibiliza os dados das Despesas dos Deputados Federais do Amapá.

## Requisitos

Para realizar o teste local da api é preciso:

- PHP 7.*
- Laravel 5.7
- Composer
- MySQL

## Passo a Passo

1. Clone o repositório
    >`git clone https://github.com/alexleao23/apiprecisava.git`
2. Dentro da pasta do projeto rode o seguinte comando no terminal ou bash:
    >`composer install`
3. Duplique o arquivo `.env.example` e renomei a cópia para `.env`.
4. Depois rode o comando:
    >`php artisan key:generate`
5. Crie um novo banco de dados vazio no MySQL.
6. Configure as seguintes variáveis no arquivo `.env`:
    >`DB_DATABASE=your-databasename-mysql.`
    >`DB_USERNAME=your-username-mysql.`
    >`DB_PASSWORD=your-password-mysql`
7. Depois rode os seguintes comandos no terminal ou bash:
    >`php artisan migrate`
    >`php artisan db:seed`
8. Depois inicie o servidor com o comando:
    >`php artisan serve`

## Enpoints da API no teste local

Rota `POST` para cadastro de usuário
>`http://localhost:8000/api/register`
Rota `POST` para fazer login
>`http://localhost:8000/api/login`
Rota `POST` para fazer logout
>`http://localhost:8000/api/logout`
Rota `GET` para receber o usuário logado
>`http://localhost:8000/api/user`
Rota `GET` para receber a lista de Deputados Federais do Amapá
>`http://localhost:8000/api/deputados`
Rota `POST` para cadastrar um comentário
>`http://localhost:8000/api/deputados/{deputado_id}/despesas/{despesa_id}/comentario`
Rota `POST` para cadastrar uma resposta
>`http://localhost:8000/api/deputados/{deputado_id}/despesas/{despesa_id}/comentarios/{comentario_id}/resposta`
Rota `GET` para receber todos os comentários de uma despesa
>`http://localhost:8000/api/deputados/{deputado_id}/despesas/{despesa_id}/comentarios`
Rota `GET` para receber todas as respostas de um comentario
>`http://localhost:8000/api/deputados/{deputado_id}/despesas/{despesa_id}/comentarios/{comentario_id}/respostas`
