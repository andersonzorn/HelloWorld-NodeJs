# -----------------------------------------------------------------------------------------------
# Definir o terminal padrão do VS Code para Command Prompt
    Ctrl + Shift + P
        Terminal: Select Default Profile
            Command Prompt

# -----------------------------------------------------------------------------------------------
# Testar Versão do Node e NPM
    node -v
    npm -v

# -----------------------------------------------------------------------------------------------
# Subir seu projeto Node para o GitHub
    # No seu projeto (pasta local)
    # Abra o terminal dentro da pasta:
        git init
        git add .
        git commit -m "Versão inicial"

# Criar repositório no GitHub
    # Vai em: https://github.com
    # Clique em New Repository
        Nome: meu-projeto-node
    # NÃO marque README (porque você já tem código)
        Criar

# Conectar seu projeto ao GitHub
# Depois de criar, ele vai te mostrar comandos. Use algo assim:

    git remote remove origin
    git remote add origin https://github.com/andersonzorn/HelloWorld-NodeJs.git

    git remote add origin https://github.com/andersonzorn/HelloWorld-NodeJs.git
    git branch -M main
    git push -u origin main

# ✔️ Pronto: seu código já está versionado.
# -----------------------------------------------------------------------------------------------


# -----------------------------------------------------------------------------------------------
# Fluxo profissional
    # Regra básica:
    # NINGUÉM trabalha direto na main

        # Fluxo ideal (Git Flow simplificado)
        # Cada pessoa faz:
            git checkout -b feature/nome-da-feature
        # Exemplo:
            git checkout -b feature/layout
        # Depois:
            git add .
            git commit -m "feature/layout: modificando"
            git push origin feature/layout
# -----------------------------------------------------------------------------------------------


# -----------------------------------------------------------------------------------------------
# Para automatizar:
    git checkout main
    git pull origin main

        git checkout -b feature/layout
        git add .
        git commit -m "feature/layout: novo visual"
        git push origin feature/layout

    git merge feature/layout
    git push origin main   


    npm install 
    npm install node
    npm install express
    npm start
    node index.js

    http://localhost:8080

# -----------------------------------------------------------------------------------------------
# Sem precisar reiniciar o servidor a cada mudança, use:
    npm install -g nodemon
    nodemon index.js

    http://localhost:8080
