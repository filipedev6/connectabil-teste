# Dashboard de Gerenciamento de Produtos

## 🚀 Funcionalidades

- Gerenciamento de produtos (operações CRUD)
- Acompanhamento e visualização de vendas
- Monitoramento de estoque em tempo real
- Design responsivo
- Suporte ao modo escuro

## 🛠 Tecnologias Utilizadas

- **Frontend**: Next.js 13, React, TailwindCSS
- **Backend**: Rotas de API do Next.js
- **Banco de Dados**: MongoDB
- **ORM**: Prisma
- **Testes**: Vitest
- **Containerização**: Docker
- **Componentes UI**: shadcn/ui

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js (v18 ou superior)
- Docker e Docker Compose
- Git

## 🚦 Começando

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd product-management
```

### 2. Configuração do Ambiente

Crie um arquivo `.env` no diretório raiz:

```env
# Desenvolvimento local
DATABASE_URL="mongodb://localhost:27017/product-management?replicaSet=rs0&directConnection=true"

# Ambiente Docker
DOCKER_DATABASE_URL="mongodb://mongodb:27017/product-management?replicaSet=rs0&directConnection=true"
```

### 3. Opções de Desenvolvimento

#### Opção A: Usando Docker (Recomendado)

1. Inicie os containers:
```bash
docker-compose up --build -d
```

2. A aplicação estará disponível em `http://localhost:4000`

#### Opção B: Desenvolvimento Local

1. Instale as dependências:
```bash
npm install
```

2. Inicie o MongoDB localmente:
```bash
# Certifique-se que o MongoDB está rodando com replica set
mongod --replSet rs0
```

3. Inicialize o replica set do MongoDB:
```bash
mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'localhost:27017'}]})"
```

4. Gere o cliente Prisma e aplique o schema:
```bash
npx prisma generate
npx prisma db push
```

5. Popule o banco de dados:
```bash
npm run seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

7. A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testes

Execute a suite de testes:

```bash
# Executar testes
npm run test

# Executar testes com interface
npm run test:ui

# Gerar relatório de cobertura
npm run coverage
```

## 📁 Estrutura do Projeto

```
├── app/                    # Diretório do Next.js
│   ├── api/               # Rotas da API
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página do dashboard
├── components/            # Componentes React
│   ├── products/         # Componentes de produtos
│   ├── sales/            # Componentes de vendas
│   └── ui/               # Componentes UI (shadcn/ui)
├── hooks/                # Hooks personalizados
├── lib/                  # Funções utilitárias e configurações
│   ├── api/             # Funções cliente da API
│   ├── db/              # Configuração do banco de dados
│   ├── types/           # Tipos TypeScript
│   └── utils/           # Funções auxiliares
├── prisma/              # Configuração e schema do Prisma
├── scripts/             # Scripts de configuração
└── docker-compose.yml   # Configuração Docker
```

## 🔄 Endpoints da API

### Produtos

- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Criar novo produto
- `GET /api/products/:id` - Obter produto específico
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Excluir produto

### Vendas

- `GET /api/sales` - Listar todas as vendas
- `POST /api/sales` - Criar nova venda

## 💻 Diretrizes de Desenvolvimento

1. **Estilo de Código**
   - Use TypeScript para segurança de tipos
   - Siga as configurações do ESLint e Prettier
   - Escreva mensagens de commit significativas

2. **Estrutura de Componentes**
   - Mantenha componentes pequenos e focados
   - Use composição ao invés de herança
   - Implemente tratamento adequado de erros

3. **Testes**
   - Escreva testes para novos componentes
   - Mantenha boa cobertura de testes
   - Teste cenários de erro

4. **Gerenciamento de Estado**
   - Use hooks React para estado local
   - Implemente estratégias adequadas de busca de dados
   - Trate estados de carregamento e erro

## 🐳 Comandos Docker

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down

# Visualizar logs
docker-compose logs -f

# Reconstruir containers
docker-compose up --build -d

# Limpar volumes
docker-compose down -v
```

## 🔧 Solução de Problemas

### Problemas Comuns

1. **Problemas de Conexão com MongoDB**
   ```bash
   # Verificar status do MongoDB
   docker-compose logs mongodb
   
   # Reinicializar replica set
   docker-compose exec mongodb mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'mongodb:27017'}]})"
   ```

2. **Erros na Geração do Prisma**
   ```bash
   # Regenerar cliente Prisma
   npx prisma generate
   
   # Resetar banco de dados
   npx prisma db push --force-reset
   ```

3. **Problemas com Volumes Docker**
   ```bash
   # Limpar volumes e reconstruir
   docker-compose down -v
   docker-compose up --build -d
   ```

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
