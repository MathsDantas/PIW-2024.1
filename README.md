# PIW-2024.1
Repositório Projeto de Interface Web de 2024.1

# :checkered_flag: Postos de Aluguel de Bicicletas

Pequenas estações de aluguel de bicicletas espalhadas pela cidade, onde os usuários poderão alugar bicicletas e devolvê-las.

## :technologist: Membros da equipe

  500629 - Antônio Mateus Gonçalves de Souza - Design Digital
  
  512278 - João Victor Bezerra dos Santos - Design Digital
  
  493433 - Matheus Dantas Batista - Design Digital
  
  471278 - Thais Lara Figeredo de Almeida - Design Digital

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

  - Usuário visitante: apenas visualizar
  - Cadastro Usuário registrado: alugar/devolver bike 
  - Cadastro Gerente: adicionar/remover bike
  - Cadastro bike
  - status honra


## :spiral_calendar: Entidades ou tabelas do sistema

  - Usuário: visitante/registrado/admin
  - Postos de aluguel
  - Bicicleta: adulta/infantil
  - Avaliação de cada um dos postos de aluguel



## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

  - Usuários visitantes poderão ver os postos de aluguel, quantas bicicletas estão lá, tanto de crianças como de adultos, ver se o posto de aluguel está aberto ou fechado.
   
  - Usuários registrados poderão ver as mesmas coisas dos usuários visitantes e mais: Alugar 1 bicicleta de adulto, e até 2 de crianças. Eles também poderão revolver as bicicletas. E só poderão alugar outras bicicletas caso não esteja alugando uma naquele momento. E saberão o status de aluguel de quais bicicletas estão alugadas por eles. E poderão marcar horários e quaisquer postos para devolver as bicicletas, caso possível. 
   
  - Usuário gerente poderá adicionar novas bicicletas nos postos de aluguel, vincular/desvincular as bicicletas  para os usuários registrados.

  - Status: Vinculados aos usuários para saber quantas e quais bicicletas estão alugadas por eles. 

  - Postos de Aluguel conterão uma quantidade determinada de bicicletas dos dois tipos. Caso não tenham nenhuma bicicletas, não poderá ser alugado bicicletas. E caso esteja cheia de bicicletas, não poderá receber a devolução dos alugueis dos usuários. Além da possibilidade de marcar horários para devoluções de bicicletas alugadas.



----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
