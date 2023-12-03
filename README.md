##Real Estate API:##

A aplicação possibilita realizar o cadastro de imóveis e de usuários interessados na aquisição de propriedades, bem como realizar o agendamento e consultar horários de visitas às propriedades disponíveis no banco de dados da imobiliária.

**Tecnologias:**

- Node.js, Typescript, TypeORM, PostgreSQL, Zod, etc.

## Endpoints:

| Método | Endpoint                   | Responsabilidade                                  | Autenticação                           |
| ------ | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| POST   | /users                     | Criação de usuário                                | Qualquer usuário, não necessita token  |
| GET    | /users                     | Lista todos os usuários                           | Apenas Admnistradores                  |
| PATCH  | /users/:id                 | Atualiza um usuário                               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id                 | Realiza um soft delete no usuário                 | Apenas Admnistradores                  |
| POST   | /login                     | Gera o token de autenticação                      | Qualquer usuário, não necessita token  |
| POST   | /categories                | Criação de categoria                              | Apenas Admnistradores                  |
| GET    | /categories                | Lista todas as categorias                         | Qualquer usuário, não necessita token  |
| GET    | /categories/:id/realEstate | Lista todos imóveis que pertencem a uma categoria | Qualquer usuário, não necessita token  |
| POST   | /realEstate                | Criação de um imóvel                              | Apenas Admnistradores                  |
| GET    | /realEstate                | Lista todos os imóveis                            | Qualquer usuário, não necessita token  |
| POST   | /schedules                 | Agenda uma visita a um imóvel                     | Qualquer usuário, obrigatório token    |
| GET    | /schedules/realEstate/:id  | lista todos os agendamentos de um imóvel          | Apenas Admnistradores                  |

## Regras de negócio da API:

### POST - /users

    -   Rota para criação de usuário com os seguintes dados:
    -   **id**: Valor SERIAL, gerado pelo typeORM;
    -   **name**: string, máximo de 45 caracteres e obrigatório;
    -   **email**: string, máximo de 45 caracteres, obrigatório e único;
    -   **password**: Uma string que armazena uma hash gerada com o **bcryptjs** diretamente pela **entidade do typeORM** de no máximo 120 caracteres;
    -   **admin**: boolean e false por padrão;
    -   **createdAt**: Gerado pelo typeORM;
    -   **updatedAt**: Gerado pelo typeORM;
    -   **deletedAt**: Gerado pelo typeORM.
    -   A rota de criação retorna todos os dados, com **exceção da hash** de senha;
    -   Não é possível cadastrar dois usuários com o mesmo **e-mail**;
    -   A rota **não precisa de autenticação** para ser acessada.

### GET - /users

    -   A rota retorna todos os dados dos usuários, com exceção da hash de senha;
    -   A rota pode ser acessada apenas por usuários administradores.

### PATCH - /users/:id

    -   A rota atualiza os dados do usuário;
    -   Não é possível atualizar os campos **id** e **admin**;
    -   Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio usuário.

### DELETE - /users/:id

    -   A rota realiza um soft delete do usuário;
    -   A rota pode ser acessada apenas por administradores;
    -   Não é possível realizar um soft delete em um usuário já deletado.

### POST - /login

    -   Rota de login recebe **email** e **password** do usuário;
    -   O login valida se o usuário existe e se os dados inseridos estão corretos;
    -   Não é possível realizar o login de um usuário deletado;
    -   A rota **não precisa de autenticação** para ser acessada.

### POST - /categories

    -   Rota para criação de categorias com os seguintes dados:
        -   **id**: Valor SERIAL, gerado pelo **typeORM**.
        -   **name**: string, máximo de 45 caracteres, obrigatório e único
    -   Não é possível cadastrar duas categorias com o mesmo nome.
    -   A rota pode ser acessada apenas por usuários administradores.

### GET - /categories

    -   Rota lista todas as categorias.
    -   A rota não precisa de autenticação para ser acessada

### GET - /categories/:id/realEstate

    -   Rota lista todos os imóveis que pertencem a uma categoria.
    -   A rota não precisa de autenticação para ser acessada.

### POST - /realEstate

    -   Rota para criação de um imóvel com os seguintes dados:
        -   **id**: Valor SERIAL, gerado pelo typeORM.
        -   **value**: decimal, obrigatório e 0 por padrão
        -   Quando trabalhamos com decimal, ela pode ser um number ou string, leve isso em consideração na hora de tipar e validar.
    -   **size**: inteiro e obrigatório
    -   **address**: um objeto com os seguintes dados:
        -   **street**: string, máximo de 45 caracteres e obrigatório
        -   **zipCode**: string, máximo de 8 caracteres e obrigatório
        -   **number**: string, máximo de 7 caracteres e opcional
        -   **city**: string, máximo de 20 caracteres e obrigatório
        -   **state**: string, máximo de 2 caracteres e obrigatório
    -   **categoryId**: inteiro
    -   **sold**: Gerado no momento da validação dos dados no formato boolean com **_default = false_**.
    -   **createdAt**: Gerado pelo typeORM.
    -   **updatedAt**: Gerado pelo typeORM.
    -   Não é possível cadastrar dois imóveis com o mesmo endereço.
    -   A rota pode ser acessada apenas por administradores.

### GET - /realEstate

    -   Rota lista todos os imóveis.
    -   A rota não precisa de autenticação para ser acessada.

### POST - /schedules

    -   Rota responsável pelo agendamento de uma visita a um imóvel com os seguintes dados:
        -   **id**: Valor SERIAL, gerado pelo **typeORM**.
        -   **date**: string da data de agendamento da visita ao imóvel, no formato americano **AAAA-DD-MM**
        -   **hour**: string do horário de agendamento da visita ao imóvel, no formato **HH:MM**
        -   **realEstateId**: inteiro
        -   **userId**: Pego através do token do usuário, ao invés de passado no body da requisição.
    -   Não é possível agendar uma visita a um imóvel com a mesma data e hora, essa verificação deve ser implementada com **query builder**.
    -   Não é possível o mesmo **usuário** agendar uma visita a 2 imóveis diferentes com a mesma data e hora, essa verificação deve ser implementada com **query builder**.
    -   Só é possível agendar uma visita durante horário comercial (08:00 as 18:00).
    -   Só é possível agendar uma visita durante dias úteis (segunda à sexta).
    -   A rota pode ser acessada tanto por usuários comuns quanto administradores.

### GET - /schedules/realEstate/:id

    -   Rota lista todos os agendamentos de um imóvel.
    -   A rota pode ser acessada apenas por administradores.
