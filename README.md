## Diferença entre POST e PUT

A definição não se resume a POST para criar e PUT para atualizar.

### POST

- Não oferece garantias de comportamento, ou seja, non-idempotent e unsafe
- Pode criar um recurso em uma URI diferente da URI especificada na requisição HTTP
- Pode simular os métodos GET, PUT e DELETE
- Pode realizar alterações parciais no recurso como o PATCH

### PUT

- Armazena um conteúdo completo na URI especificada
- Pode criar caso não exista ou substituir completamente casa já exista o recurso
- O método é idempotente (apesar de não aplicado nesse projeto)

### Quando usar

- Servidor escolhe a URI na criação (POST)
- Cliente escolhe a URI na criação (PUT) - ver conceito de **Store** de Mark Massé
- Atualizar um recurso pela URI (POST ou PUT) - sendo PUT mais semântico
- Atualizar parcialmente um recurso (POST ou PATCH) - sendo PATCH mais semântico)
