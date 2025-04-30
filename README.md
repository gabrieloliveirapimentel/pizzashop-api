# 🍕 Pizza Shop API

Bem-vindo ao repositório do **Pizza Shop API**! Aqui você encontrará as instruções para rodar o servidor, a aplicação e realizar as configurações necessárias.

---
### 1. Tecnologias utilizadas
- Elysia
- Drizzle

---

### 2. Rodar o Servidor
**Inicie o Docker**  
No terminal, execute o comando abaixo para iniciar o serviço do Docker:
```bash
sudo systemctl start docker.service
```

**Suba o container da API**  
Com o Docker rodando, navegue até a pasta `api` e inicie o container com o comando:
```bash
sudo docker-compose up -d
```

**Inicie o servidor de desenvolvimento**  
Rodar o comando para iniciar o banco de dados e o servidor:
```bash
bun migrate
bun seed
bun dev
```

 **Parar os serviços do Docker**  
Para encerrar os serviços do Docker, utilize os comandos abaixo:
```bash
sudo systemctl stop docker.service
sudo systemctl stop docker.socket
```