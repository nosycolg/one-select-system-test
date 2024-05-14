### Sobre o Teste

- O objetivo deste teste é avaliar o conhecimento prático de cada candidato.
- Como a vaga é para Full Stack, serão avaliadas as partes de Backend, Frontend e comunicação entre os dois por meio da exposição de rotas da API.
- Além do funcionamento da tarefa solicitada, também serão considerados:
  - A estilização dos componentes no frontend e a responsividade.
  - Documentação.
  - Testes.
  - Organização do código e do projeto de forma geral.
  - Tipagem.
  - Segurança.
  - Boas práticas de desenvolvimento e entrega.
- Os requisitos das tarefas são passados de forma aberta, então a interpretação e o desenrolar deles também fazem parte da avaliação.
- No teste, pode ser utilizado qualquer tipo de meio de pesquisa, inteligência artificial, bibliotecas extras.
- Utilize a seguinte stack para desenvolver as atividades:
  - Utilize o framework React para montar o Frontend.
  - Utilize TypeScript para o desenvolvimento do Frontend e Backend.
  - De preferência, utilize a programação orientada a objetos como padrão.

### Funcionalidades

#### Clientes

1. **Criar Cliente**: Os usuários podem criar novos clientes fornecendo informações como nome, tipo (pessoa física ou jurídica), CPF (para pessoa física) ou CNPJ (para pessoa jurídica), data de nascimento, endereço (rua, número, CEP, bairro e cidade), etc.
2. **Atualizar Cliente**: Os usuários podem atualizar as informações de um cliente existente.
3. **Editar Cliente**: Os usuários podem editar os detalhes de um cliente, como nome, tipo, CPF/CNPJ, data de nascimento, endereço, etc.
4. **Ativar ou Desativar Cliente**: Os usuários podem ativar ou desativar um cliente, dependendo do seu status.
5. **Apagar Cliente**: Os usuários podem apagar permanentemente um cliente da base de dados.

#### Roteadores

1. **Criar Roteador**: Os usuários podem adicionar novos roteadores especificando detalhes como endereço IPv4, endereço IPv6, marca, modelo, etc.
2. **Atualizar Roteador**: Os usuários podem atualizar as informações de um roteador existente.
3. **Editar Roteador**: Os usuários podem editar os detalhes de um roteador, como endereço IPv4, endereço IPv6, marca, modelo, etc.
4. **Ativar ou Desativar Roteador**: Os usuários podem ativar ou desativar um roteador, dependendo do seu status.
5. **Apagar Roteador**: Os usuários podem apagar permanentemente um roteador da base de dados.

### Associação de Clientes a Roteador

1. **Associar Clientes a um Roteador**: Os usuários podem associar clientes existentes a um roteador específico.

### Elasticsearch

1. **Logs de Requisições**: Cada requisição feita ao sistema é registrada como um log no Elasticsearch, incluindo detalhes como tipo de ação, timestamp, etc.
2. **Consulta de Logs**: Os usuários podem consultar os logs armazenados no Elasticsearch através de uma rota específica no sistema.

## Tecnologias Utilizadas

### Backend

- **Express**: Utilizado como framework para construção da API.
- **Prisma**: ORM (Object-Relational Mapping) para comunicação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional para armazenamento de dados.

### Frontend

- **Vite**: Build tool para construção do frontend.
- **Tailwind CSS**: Framework CSS utilizado para estilização dos componentes.
- **React.js**: Framework JavaScript para construção da interface do usuário.

### Elasticsearch

- **Elasticsearch**: Utilizado para armazenamento e consulta de logs.

### Internacionalização (i18n)

- **i18next**: Biblioteca para internacionalização, permitindo tradução do sistema para múltiplos idiomas.

Peço desculpas pela omissão. Aqui está o README atualizado, incluindo a menção ao Makefile:

---

## Como Rodar o Projeto

1. Clone este repositório para sua máquina local.
2. Atualize a versão do Node.js com `nvm use`.
3. Instale as dependências do backend e frontend executando `npm install`.
4. Configure o arquivo `.env` com as variáveis de ambiente necessárias.
5. Inicie o backend e o frontend executando `make up`.
6. Acesse a aplicação no navegador utilizando o endereço `http://localhost:4200`.
